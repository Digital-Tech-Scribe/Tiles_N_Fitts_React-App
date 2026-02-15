import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { createClient } from 'redis';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Resend Configuration
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Zoho SMTP / NodeMailer Configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

// Redis Configuration (Serverless pattern from SKILL-PLAN_MODEL)
let redisClient = null;
if (process.env.REDIS_URL) {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: 5000,
        reconnectStrategy: false
      }
    });
    redisClient.on('error', (err) => console.error('[Redis] Client error:', err.message));
    redisClient.connect().catch(err => console.error('[Redis] Connection initial failure:', err.message));
  } catch (error) {
    console.error('[Redis] Setup failed:', error.message);
  }
}

/**
 * Endpoint: Website Contact Form
 */
app.post('/api/contact', async (req, res) => {
  const { name, email, project } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  // 1. Rate Limiting (3-min cooldown)
  if (redisClient && redisClient.isOpen) {
    const rateKey = `rate_limit_contact:${email}`;
    const exists = await redisClient.get(rateKey);
    if (exists) {
      return res.status(429).json({ error: 'Please wait 3 minutes before submitting again.' });
    }
    await redisClient.set(rateKey, 'true', { EX: 180 });
  }

  try {
    // 2. Admin Notification (Resend)
    if (resend) {
      await resend.emails.send({
        from: 'system@juniperbroz.com',
        to: process.env.ZOHO_EMAIL,
        subject: `New Project Lead: ${name}`,
        html: `
          <h3>New Website Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Details:</strong> ${project}</p>
        `,
      });
    }

    // 3. Client Auto-Reply (Zoho SMTP)
    await transporter.sendMail({
      from: `"Juniper Broz" <${process.env.ZOHO_EMAIL}>`,
      to: email,
      subject: 'We received your message!',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! We've received your inquiry about your project. Our team will review the details and get back to you shortly.</p>
        <p>Best regards,<br/>Juniper Broz Team</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Contact Error]:', error);
    res.status(500).json({ error: 'Failed to process submission. Please try again later.' });
  }
});

/**
 * Endpoint: AI Email Auto-Reply (Triggered by Activepieces)
 */
app.post('/api/email-reply', async (req, res) => {
  const { from, subject, body } = req.body;
  const authHeader = req.headers.authorization;

  // Webhook Security
  if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!from || !body) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  // 1. Rate Limiting (24h AI reply limit)
  if (redisClient && redisClient.isOpen) {
    const date = new Date().toISOString().split('T')[0];
    const rateKey = `rate_limit:${from}:${date}`;
    const exists = await redisClient.get(rateKey);
    if (exists) {
      return res.status(200).json({ message: 'Rate limit hit for today, skipping AI reply.' });
    }
    await redisClient.set(rateKey, 'true', { EX: 86400 });
  }

  try {
    // 2. AI Logic via GitHub Models API
    const aiResponse = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_PAT}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional assistant for Juniper Broz Investment Services. Write a concise, professional, and friendly reply to the following client inquiry. Keep it under 100 words.' },
          { role: 'user', content: `Subject: ${subject}\n\nBody: ${body}` }
        ]
      })
    });

    const data = await aiResponse.json();
    const replyText = data.choices[0].message.content;

    // 3. Send AI Reply (Resend)
    if (resend) {
      await resend.emails.send({
        from: 'myservice@juniperbroz.com',
        to: from,
        subject: `Re: ${subject}`,
        text: replyText,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('[AI Reply Error]:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
