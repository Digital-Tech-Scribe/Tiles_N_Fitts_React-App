
import { motion } from 'framer-motion';

export const AboutPage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* 1. Hero Section using the upscaled logo */}
            <div className="h-[60vh] flex flex-col items-center justify-center border-b border-zinc-800">
                <motion.img 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src="/TilesNfitt_upscayl_2x_upscayl-lite-4x.png" 
                    alt="Tiles N Fitt Logo" 
                    className="w-48 md:w-64 object-contain mb-8"
                />
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold tracking-tighter uppercase"
                >
                    About Us
                </motion.h1>
            </div>

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-24">
                
                {/* 2. "Lets get you up to speed" Section (Text from Image 1) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32">
                    <div className="md:col-span-4">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
                            Lets get you <br />
                            <span className="text-zinc-500">up to speed</span>
                        </h2>
                    </div>
                    <div className="md:col-span-8 space-y-8 text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
                        <p>
                            Since 2017, we have been creating projects intertwining Nigerian traditions, world trends and the Japanese philosophy of wabi-sabi, the forces of nature, human talent and architectural mind.
                        </p>
                        <p>
                            We have completed a few projects in lagos and are ready to create something significant for you.
                        </p>
                        <p>
                            The main task of our specialists — architects, designers is to create comfort that will become near and dear.
                        </p>
                        
                        <div className="pt-8">
                            <h3 className="text-2xl font-bold text-white mb-6">We are embodied by the following principles:</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <span className="text-zinc-500 font-bold">1.</span>
                                    <span>Spatial freeness – less walls = more space</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-zinc-500 font-bold">2.</span>
                                    <span>Maximum Natural light - floor to ceiling windows, there’s no such thing as too much light</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-zinc-500 font-bold">3.</span>
                                    <span>Spatial fluidity- via customizable spaces by design rather than rigid spaces and sliding wall panels rather than walls</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-zinc-500 font-bold">4.</span>
                                    <span>Outside - to Inside – completely interconnected spaces with the outer facade via completely foldable glass doors leading onto wooden or concrete decks</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-zinc-500 font-bold">5.</span>
                                    <span>No visible roofs – rather, parapets to conceal roofs</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-zinc-500 font-bold">6.</span>
                                    <span>Practical ergonomics and functionality – ensuring that internal spaces are designed to adequately accommodate the physical requirements of occupiers, furniture placement, appliances and other mod-cons that make up essential lifestyle requirements today.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 3. Image Sections (Diagram, Stats, Team) */}
                <div className="space-y-32">
                    {/* Diagram */}
                    <div className="w-full">
                        <img 
                            src="/Tiles and fitt company profile-images-2.jpg" 
                            alt="What we do diagram" 
                            className="w-full h-auto rounded-lg"
                        />
                    </div>

                    {/* Stats */}
                    <div className="w-full">
                         <img 
                            src="/Tiles and fitt company profile-images-3.jpg" 
                            alt="Progress tracker" 
                            className="w-full h-auto rounded-lg"
                        />
                    </div>

                    {/* Team */}
                    <div className="w-full">
                         <img 
                            src="/Tiles and fitt company profile-images-4.jpg" 
                            alt="Our Family" 
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>

                {/* 4. Work Done So Far (Batch 2) */}
                <div className="py-32">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-16"
                    >
                        Work done <br/> 
                        <span className="text-zinc-500">so far...</span>
                    </motion.h2>
                    <div className="space-y-24">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <motion.div 
                                key={num}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img 
                                    src={`/project-showcase-${num}.png`}
                                    alt={`Project Showcase ${num}`}
                                    className="w-full h-auto rounded-lg shadow-2xl"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 5. Project Structure (Final Image) */}
                <div className="pb-32">
                     <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-16"
                    >
                        Project <br/> 
                        <span className="text-zinc-500">Structure</span>
                    </motion.h2>
                    <div className="w-full">
                         <img 
                            src="/project-structure.png" 
                            alt="Project Structure Diagram" 
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};
