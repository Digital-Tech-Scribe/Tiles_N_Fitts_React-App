import { useState } from 'react';

export function ContactSection() {
  // individual states for form
  const [Name, setName] = useState('');
  const [email, setemail] = useState('');
  const [PROJECT, setPROJECT] = useState('');

  const sendForm = (e: any) => {
    e.preventDefault();
    console.log("sending form...");

    if (Name == "") {
      alert("Please enter name");
      return;
    }
    if (email.length < 5) {
      alert("Email too short");
      return;
    }

    // TODO: connect to backend
    console.log(Name, email, PROJECT);
    alert("Thanks " + Name + ", we recieved your message!");
  }

  return (
    <section id="contact" className="flex flex-col md:flex-row min-h-screen">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 px-6 md:px-24 py-24 flex flex-col justify-center bg-white">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 uppercase mb-8 leading-[0.9]">
          Partner With <br /> Us
        </h2>
        <p className="text-zinc-600 mb-12 max-w-md">
          If you're someone who's looking to bring a space to life, share a few
          details to help me reach out to you so we can discuss how to bring
          your vision to life.
        </p>

        <form className="space-y-8 max-w-md" onSubmit={sendForm}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-500">
              Your full name
            </label>
            <input 
              type="text" 
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-50 border-none p-4 focus:ring-1 focus:ring-zinc-900" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-500">
              Your email address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full bg-zinc-50 border-none p-4 focus:ring-1 focus:ring-zinc-900" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-500">
              A little bit about your project
            </label>
            <textarea 
              rows={4} 
              value={PROJECT}
              onChange={(e) => setPROJECT(e.target.value)}
              className="w-full bg-zinc-50 border-none p-4 focus:ring-1 focus:ring-zinc-900" 
              placeholder="Example Text"
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-zinc-900 text-white font-bold uppercase tracking-widest py-4 hover:bg-zinc-800 transition-colors">
            Submit
          </button>
        </form>
      </div>

      {/* Right - Image */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative bg-zinc-100">
        <img src="/Scene7_5-2.png" alt="Contact visual" className="w-full h-full object-cover" />
      </div>
    </section>
  );
}