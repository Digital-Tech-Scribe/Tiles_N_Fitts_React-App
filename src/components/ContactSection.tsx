import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitContactForm } from '../utils/api';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitted && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isSubmitted && countdown === 0) {
      navigate('/');
      window.scrollTo(0, 0);
    }
    return () => clearTimeout(timer);
  }, [isSubmitted, countdown, navigate]);

  const sendForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (email.length < 5 || !email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactForm({ name, email, project });
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative flex flex-col md:flex-row min-h-screen transition-colors duration-300">
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="max-w-md w-full text-center space-y-8"
            >
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle2 className="w-24 h-24 text-zinc-900 dark:text-white" />
                </motion.div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase">
                  Message Sent
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                  Thanks for reaching out, {name}! We've received your inquiry and will get back to you soon.
                </p>
              </div>

              <div className="pt-8">
                <p className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-4">
                  Redirecting in {countdown}s
                </p>
                <button 
                  onClick={() => navigate('/')}
                  className="inline-flex items-center space-x-2 text-zinc-900 dark:text-white font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                  <span>Return Home</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left - Form */}
      <div className="w-full md:w-[60%] px-6 md:pl-24 md:pr-16 py-24 flex flex-col items-center text-center md:items-start md:text-left justify-center bg-warm-light dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-2xl mx-auto md:mx-0">
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase mb-8 leading-[0.85] sm:leading-[0.85]">
            Partner With <br className="hidden sm:block" /> Us
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-md mx-auto md:mx-0 text-lg">
            If you're someone who's looking to bring a space to life, share a few
            details to help us reach out to you so we can discuss how to bring
            your vision to life.
          </p>

          <form className="space-y-8 max-w-md mx-auto md:mx-0 text-left" onSubmit={sendForm}>
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Your full name
              </label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-base w-full bg-warm-charcoal/5 dark:bg-zinc-800 border-none p-4 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white text-zinc-900 dark:text-white transition-colors outline-none" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Your email address
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base w-full bg-warm-charcoal/5 dark:bg-zinc-800 border-none p-4 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white text-zinc-900 dark:text-white transition-colors outline-none" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                A little bit about your project
              </label>
              <textarea 
                rows={4} 
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="text-base w-full bg-warm-charcoal/5 dark:bg-zinc-800 border-none p-4 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white text-zinc-900 dark:text-white transition-colors outline-none resize-none" 
                placeholder="Tell us about your space..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group relative w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold uppercase tracking-widest py-4 overflow-hidden transition-all disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Submit'
                )}
              </span>
              {!isSubmitting && (
                <div className="absolute inset-0 bg-zinc-800 dark:bg-zinc-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden md:block w-full md:w-[40%] h-[50vh] md:h-auto relative bg-warm-light dark:bg-zinc-800 transition-colors duration-300 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={`${import.meta.env.BASE_URL}Contact Hero/Scene7_5-2.webp`} 
          alt="Contact visual" 
          className="w-full h-full object-cover" 
        />
      </div>
    </section>
  );
}