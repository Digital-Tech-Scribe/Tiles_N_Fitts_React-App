import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '../components/OptimizedImage';
import { usePageLoading } from '../contexts/LoadingContext';

// Team Member Interface - Updated with sitting/standing images
interface TeamMember {
    name: string;
    title: string;
    education?: string;
    sittingImage?: string;  // Default image (sitting)
    standingImage?: string; // Hover image (standing)
}

// Team Member Card Component - With smooth cascading animation
const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
    const [isActive, setIsActive] = useState(false);
    
    // Determine which images to use
    const primaryImage = member.sittingImage || member.standingImage;
    const hasHoverEffect = !!(member.sittingImage && member.standingImage);
    
    return (
        <motion.div 
            className="flex flex-col group cursor-pointer touch-manipulation"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
                duration: 0.6, 
                delay: index * 0.1,  // Cascading delay based on index
                ease: [0.25, 0.1, 0.25, 1]  // Smooth cubic-bezier
            }}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onClick={() => setIsActive(!isActive)}
        >
            {/* Portrait Image Container - With smooth sliding animation */}
            <div className="aspect-[3/4] mb-4 overflow-hidden relative rounded-lg bg-zinc-100 dark:bg-zinc-800">
                {hasHoverEffect ? (
                    <>
                        {/* Sitting Image (Default) - slides up on hover */}
                        <div 
                            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                            style={{ 
                                transform: isActive ? 'translateY(-100%)' : 'translateY(0)' 
                            }}
                        >
                            <OptimizedImage 
                                src={`${import.meta.env.BASE_URL}About Us View/our-family/${member.sittingImage}`}
                                alt={`${member.name} - sitting`}
                                className="w-full h-full object-cover"
                                containerClassName="w-full h-full"
                            />
                        </div>
                        {/* Standing Image (Hover) - slides in from bottom */}
                        <div 
                            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                            style={{ 
                                transform: isActive ? 'translateY(0)' : 'translateY(100%)' 
                            }}
                        >
                            <OptimizedImage 
                                src={`${import.meta.env.BASE_URL}About Us View/our-family/${member.standingImage}`}
                                alt={`${member.name} - standing`}
                                className="w-full h-full object-cover"
                                containerClassName="w-full h-full"
                            />
                        </div>
                    </>
                ) : (
                    // Single image - smooth scale on hover
                    <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105">
                        <OptimizedImage 
                            src={`${import.meta.env.BASE_URL}About Us View/our-family/${primaryImage}`}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            containerClassName="w-full h-full"
                        />
                    </div>
                )}
            </div>
            {/* Info */}
            <h3 className="font-semibold text-base text-warm-charcoal dark:text-white">
                {member.name}
            </h3>
            <p className="text-sm text-warm-charcoal/70 dark:text-gray-400 mb-1">
                {member.title}
            </p>
            {member.education && (
                <p className="text-xs text-warm-charcoal/50 dark:text-gray-500">
                    {member.education}
                </p>
            )}
        </motion.div>
    );
};

export const AboutPage = () => {
    const { setIsLoading } = usePageLoading();

    useEffect(() => {
        const heroImage = `${import.meta.env.BASE_URL}About Us View/our-family/The_people.jpeg`;
        const img = new Image();
        img.src = heroImage;
        img.onload = () => setTimeout(() => setIsLoading(false), 300);
        img.onerror = () => setIsLoading(false);
    }, [setIsLoading]);
    
    // Updated team data - Reordered with correct roles
    const allTeam: TeamMember[] = [
        // Director
        { 
            name: "Arc. GbemiLeke", 
            title: "Director", 
            education: "Bsc. Msc. Arch", 
            sittingImage: "Arc-Leke_standing.jpeg",
            standingImage: "Arc-Leke_sitting.jpeg"
        },
        // Lead Architect
        { 
            name: "Yazeed", 
            title: "Lead Design Architect", 
            education: "Bsc. Arch", 
            standingImage: "Yazeed_standing.jpeg"
        },
        // Korede
        { 
            name: "Korede", 
            title: "Architect", 
            education: "Bsc. Arch", 
            standingImage: "Korede_standing.jpeg"
        },
        // Azeez
        { 
            name: "Alfred", 
            title: "Architect", 
            education: "Bsc. Arch", 
            sittingImage: "Alfred_sitting.jpeg"
        },
        // Samuel
        { 
            name: "Samuel", 
            title: "Architect", 
            education: "Bsc. Arch", 
            sittingImage: "Samuel_sitting.jpeg"
        },
        // Andrew
        { 
            name: "Andrew", 
            title: "Construction Project Manager", 
            education: "Bsc. Bld. Tech", 
            sittingImage: "Andrew_standing.jpeg",
            standingImage: "Andrew_sitting.jpeg"
        },
    ];

    return (
        <div className="min-h-screen bg-warm-light dark:bg-warm-dark text-warm-charcoal dark:text-white font-sans overflow-x-hidden">
            
            {/* 1. Hero Section - Aligned with Header */}
            <section className="px-6 md:px-12 pt-32 lg:pt-40 pb-24">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    {/* Left: Hero Image */}
                    <div className="lg:col-span-7 h-[50vh] lg:h-[70vh] overflow-hidden rounded-2xl shadow-xl">
                        <OptimizedImage 
                            src={`${import.meta.env.BASE_URL}About Us View/our-family/The_people.jpeg`}
                            alt="The Team"
                            priority={true}
                            className="w-full h-full object-cover object-center"
                            containerClassName="w-full h-full"
                        />
                    </div>
                    {/* Right: Quote */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <h2 className="text-3xl lg:text-4xl font-medium leading-tight mb-8">
                                FROM THE LAND OF <br />
                                <span className="text-warm-charcoal/50 dark:text-gray-500">THE RISING SUN</span>
                            </h2>
                            <p className="text-xl lg:text-2xl font-light text-warm-charcoal/70 dark:text-gray-400 leading-relaxed mb-8 border-l-2 border-warm-charcoal/20 pl-6">
                                "We're with you every step of the way, it's not just an obligation it's our promise."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] w-8 bg-warm-charcoal/30"></div>
                                <p className="text-sm text-warm-charcoal/50 dark:text-gray-500 tracking-widest uppercase">
                                    Gbemileke Peters
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Introduction Section */}
            <section className="px-6 md:px-12 py-32 border-t border-warm-charcoal/10 dark:border-gray-700">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Left: Title */}
                    <div className="lg:col-span-4">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl lg:text-7xl font-semibold tracking-tighter uppercase leading-[0.85]"
                        >
                            Our <br />
                            <span className="text-warm-charcoal/30 dark:text-gray-600">People</span>
                        </motion.h2>
                    </div>
                    {/* Right: Description */}
                    <div className="lg:col-span-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8 text-xl lg:text-2xl font-light leading-relaxed text-warm-charcoal/80 dark:text-gray-300"
                        >
                            <p>
                                Since 2017, we have been creating projects intertwining Nigerian traditions, world trends and the Japanese philosophy of wabi-sabi, the forces of nature, human talent and architectural mind.
                            </p>
                            <p className="border-t border-warm-charcoal/10 pt-8 dark:border-gray-700">
                                We have completed numerous projects in Lagos and are ready to create something significant for you. The main task of our specialists — architects, designers — is to create comfort that will become near and dear.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Team Grid */}
            <section className="px-6 md:px-12 py-32 border-t border-warm-charcoal/10 dark:border-gray-700">
                <div className="max-w-[1920px] mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 lg:gap-12">
                        {allTeam.map((member, index) => (
                            <TeamMemberCard key={member.name} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Principles Section */}
            <section className="px-6 md:px-12 py-32 border-t border-warm-charcoal/10 dark:border-gray-700">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    <div className="lg:col-span-4">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl lg:text-7xl font-semibold tracking-tighter uppercase leading-[0.85]"
                        >
                            Our <br />
                            <span className="text-warm-charcoal/30 dark:text-gray-600">Principles</span>
                        </motion.h2>
                    </div>
                    <div className="lg:col-span-8">
                        <motion.ul 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
                        >
                            {[
                                { num: '01', title: 'Spatial freeness', desc: 'Less walls, more space' },
                                { num: '02', title: 'Maximum natural light', desc: 'Floor to ceiling windows' },
                                { num: '03', title: 'Spatial fluidity', desc: 'Customizable spaces, sliding panels' },
                                { num: '04', title: 'Outside to inside', desc: 'Interconnected spaces with foldable glass doors' },
                                { num: '05', title: 'No visible roofs', desc: 'Parapets to conceal roofs' },
                                { num: '06', title: 'Practical ergonomics', desc: 'Spaces designed for modern lifestyle' }
                            ].map((principle) => (
                                <li key={principle.num} className="flex flex-col gap-4 group">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold text-warm-charcoal/30 dark:text-gray-600">{principle.num}</span>
                                        <div className="h-[1px] flex-grow bg-warm-charcoal/10 dark:bg-gray-800 transition-all group-hover:bg-warm-charcoal/30"></div>
                                    </div>
                                    <h4 className="text-xl font-medium tracking-tight uppercase">{principle.title}</h4>
                                    <p className="text-warm-charcoal/60 dark:text-gray-400 font-light">{principle.desc}</p>
                                </li>
                            ))}
                        </motion.ul>
                    </div>
                </div>
            </section>

        </div>
    );
};
