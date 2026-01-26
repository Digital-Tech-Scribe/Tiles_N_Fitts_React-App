
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Team Member Interface
interface TeamMember {
    name: string;
    title: string;
    education?: string;
    image: string;
}

// Team Member Card Component
const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-3 overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600">
            <img 
                src={`${import.meta.env.BASE_URL}About Us View/our-family/${member.image}`}
                alt={member.name}
                className="w-full h-full object-cover grayscale"
            />
        </div>
        <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-white">{member.name}</h3>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{member.title}</p>
        {member.education && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{member.education}</p>
        )}
    </div>
);

export const AboutPage = () => {
    const { effectiveTheme } = useTheme();
    
    // Team data
    const directors = [
        { name: "Gbemileke Peters", title: "Director", education: "Bsc. Msc. Arch", image: "our-family_1.jpg" },
        { name: "Lekan Adeoti", title: "Director", education: "", image: "our-family_2.jpg" }
    ];

    const team = [
        { name: "Olaseni Olaniyi", title: "Lead Architect", education: "Bsc. Msc. Arch MNIA", image: "our-family_3.jpg" },
        { name: "Osah Enahoro", title: "Director", education: "Bsc. Msc. Arch", image: "our-family_4.jpg" },
        { name: "Oyesiku Oluwaseyi", title: "Construction Architect", education: "Bsc. Msc. Arch", image: "our-family_5.jpg" },
        { name: "Alao Abdulmumin", title: "Project Architect", education: "Bsc. Arch", image: "our-family_6.jpg" }
    ];

    const advisors = [
        { name: "Omolade Olawale", title: "Head Advisor", education: "LL.B, B.L, MBA", image: "our-family_7.jpg" },
        { name: "Adeyemi Ajayi", title: "Lead Advisor", education: "B.Eng. Msc. PM, APMG, PgD-IT", image: "our-family_8.png" },
        { name: "Sir Shina Peters", title: "Business Advisory", education: "", image: "our-family_9.jpg" }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
            {/* 1. Hero Section using the upscaled logo */}
            <div className="h-[60vh] flex flex-col items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <motion.img 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={`${import.meta.env.BASE_URL}Logo/logo-upscaled.png`} 
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

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-12">
                
                {/* 2. "Lets get you up to speed" Section (Text from Image 1) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-16">
                    <div className="md:col-span-4">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
                            Lets get you <br />
                            <span className="text-gray-500 dark:text-gray-400">up to speed</span>
                        </h2>
                    </div>
                    <div className="md:col-span-8 space-y-8 text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
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
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">We are embodied by the following principles:</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <span className="text-gray-500 dark:text-gray-400 font-bold">1.</span>
                                    <span>Spatial freeness – less walls = more space</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-gray-500 dark:text-gray-400 font-bold">2.</span>
                                    <span>Maximum Natural light - floor to ceiling windows, there's no such thing as too much light</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-gray-500 dark:text-gray-400 font-bold">3.</span>
                                    <span>Spatial fluidity- via customizable spaces by design rather than rigid spaces and sliding wall panels rather than walls</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-gray-500 dark:text-gray-400 font-bold">4.</span>
                                    <span>Outside - to Inside – completely interconnected spaces with the outer facade via completely foldable glass doors leading onto wooden or concrete decks</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-gray-500 dark:text-gray-400 font-bold">5.</span>
                                    <span>No visible roofs – rather, parapets to conceal roofs</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-gray-500 dark:text-gray-400 font-bold">6.</span>
                                    <span>Practical ergonomics and functionality – ensuring that internal spaces are designed to adequately accommodate the physical requirements of occupiers, furniture placement, appliances and other mod-cons that make up essential lifestyle requirements today.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 3. Image Sections (Diagram, Stats) */}
                <div className="space-y-16">
                    {/* What We Do Diagram - Theme Aware */}
                    <div className="w-full">
                        <img 
                            src={effectiveTheme === 'dark' 
                                ? `${import.meta.env.BASE_URL}About Us View/what-we-do_dark-mode.jpg`
                                : `${import.meta.env.BASE_URL}About Us View/What-we-do_light-mode.png`
                            } 
                            alt="What we do diagram" 
                            className="w-full h-auto rounded-lg transition-opacity duration-300"
                        />
                    </div>

                    {/* Project Statistics - Live Data */}
                    <div className="w-full py-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-7xl mx-auto"
                        >
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
                                <div>
                                    <h3 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-2">70+</h3>
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">PROJECTS DESIGNED</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-2">20+</h3>
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">PROJECTS DESIGNED AND BUILT</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-2">100+</h3>
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">NO OF RESIDENCES</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-2">16Bi.</h3>
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">TOTAL PROJECT VALUE</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-2">8yrs</h3>
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">YEARS OF OPERATION</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-2">15+</h3>
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">SATISFIED CLIENTS</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Our Family - Organizational Structure */}
                    <div className="w-full py-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-7xl mx-auto"
                        >
                            {/* Title - Centered */}
                            <h2 className="text-5xl md:text-7xl font-bold mb-12 text-gray-900 dark:text-white text-center">
                                Our Family
                            </h2>

                            {/* Directors - Top Level - Centered */}
                            <div className="mb-8">
                                <div className="flex justify-center gap-8 md:gap-16 mb-8">
                                    {directors.map((director) => (
                                        <TeamMemberCard key={director.name} member={director} />
                                    ))}
                                </div>
                                {/* Connection line - Centered */}
                                <div className="w-full flex justify-center mb-6">
                                    <div className="w-3/4 md:w-1/2 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                                </div>
                            </div>

                            {/* Team - Second Level - Centered with max-width */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
                                {team.map((member) => (
                                    <TeamMemberCard key={member.name} member={member} />
                                ))}
                            </div>

                            {/* Advisory Board - Properly Centered */}
                            <div className="mt-16">
                                <h2 className="text-5xl md:text-7xl font-bold mb-12 text-gray-900 dark:text-white text-center">
                                    Advisory Board
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                                    {advisors.map((advisor) => (
                                        <TeamMemberCard key={advisor.name} member={advisor} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 5. Project Structure (Final Image) */}
                <div className="pb-16 mt-16">
                     <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-12"
                    >
                        Project <br/> 
                        <span className="text-gray-500 dark:text-gray-400">Structure</span>
                    </motion.h2>
                    <div className="w-full">
                         <img 
                            src={effectiveTheme === 'dark'
                                ? `${import.meta.env.BASE_URL}About Us View/project-structure_dark-mode.png`
                                : `${import.meta.env.BASE_URL}About Us View/project-structure_light-mode.png`
                            } 
                            alt="Project Structure Diagram" 
                            className="w-full h-auto rounded-lg transition-opacity duration-300"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};
