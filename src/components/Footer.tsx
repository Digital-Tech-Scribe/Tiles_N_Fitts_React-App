import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Send, Mail } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { submitContactForm } from "../utils/api";

export function Footer() {
  const { effectiveTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleQuickConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await submitContactForm({
        name: "Quick Connect (Footer)",
        email: email,
        project: "Automated quick connection request from website footer."
      });
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Quick connect error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <footer className="relative bg-warm-light dark:bg-zinc-950 pt-24 pb-12 px-6 md:px-12 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-500 overflow-hidden">
      {/* Dynamic Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-zinc-900/5 dark:bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 sm:gap-x-12 sm:gap-y-16 lg:gap-8">
          
          {/* Brand Section */}
          <div className="sm:col-span-1 lg:col-span-4 space-y-8 flex flex-col items-center text-center sm:items-start sm:text-left">
            <Link to="/" className="flex items-center gap-4 group w-fit">
              <img 
                src={`${import.meta.env.BASE_URL}Logo/logo_${effectiveTheme}-mode.png`} 
                alt="Tiles N Fitt Logo" 
                className={`w-12 h-12 object-contain transition-all duration-500 group-hover:scale-110 ${
                  effectiveTheme === 'light' ? 'scale-[1.6]' : ''
                }`}
              />
              <span className="text-2xl font-bold tracking-tight uppercase text-zinc-900 dark:text-white">
                TILES N FITT
              </span>
            </Link>
            
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Crafting exceptional architectural experiences through precision and innovative solutions. Transforming spaces into masterpieces.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-8 text-center sm:text-left">
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Explore</h4>
            <ul className="space-y-4">
              {['About', 'Services', 'Projects', 'Gallery', 'Reviews'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Us Section */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-8 flex flex-col items-center text-center sm:items-start sm:text-left">
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Reach Us</h4>
            <div className="flex flex-row lg:flex-col gap-4">
              <motion.a 
                whileHover={{ y: -5, x: 5 }}
                href="https://www.instagram.com/tilesandfitt.ng?igsh=MWV6OG5xbng0bWMz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex-none aspect-square rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 transition-all duration-300"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, x: 5 }}
                href="https://www.linkedin.com/company/tiles-fitt-ltd/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex-none aspect-square rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 transition-all duration-300"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, x: 5 }}
                href="mailto:contact@tilesnfitt.com"
                className="w-12 h-12 flex-none aspect-square rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 transition-all duration-300"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Connect Section */}
          <div className="sm:col-span-1 lg:col-span-4 space-y-8 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Quick Connect</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[240px] mx-auto sm:mx-0">Leave your email and we'll reach out to you shortly.</p>
            </div>
            
            <form onSubmit={handleQuickConnect} className="w-full max-w-sm relative group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full bg-zinc-100 dark:bg-zinc-900 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white text-zinc-900 dark:text-white transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="absolute right-2 top-2 bottom-2 px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center gap-2 group-hover:shadow-lg disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <div className="w-4 h-4 border-2 border-zinc-400 border-t-zinc-100 animate-spin rounded-full" />
                ) : status === 'success' ? (
                  "Sent!"
                ) : (
                  <>
                    <span>Submit</span>
                    <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            {status === 'error' && (
              <p className="text-xs text-red-500 animate-pulse">Failed to send. Please try again.</p>
            )}
            {status === 'success' && (
              <p className="text-xs text-emerald-500">Perfect! We'll get back to you soon.</p>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-600">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Cookie Policy</a>
          </div>
          
          <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} TILES N FITT. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}