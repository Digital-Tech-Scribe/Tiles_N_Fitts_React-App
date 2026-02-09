
import { useEffect } from 'react';
import { ArchitecturalHero } from '../components/ArchitecturalHero';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { StatsSection } from '../components/StatsSection';
import { GallerySection } from '../components/GallerySection';
import { ReviewsSection } from '../components/ReviewsSection';
import { ContactSection } from '../components/ContactSection';
import { usePageLoading } from '../contexts/LoadingContext';

export const Home = () => {
    const { setIsLoading } = usePageLoading();

    useEffect(() => {
        const heroBg = `${import.meta.env.BASE_URL}Hero Home/Hero-Image-Background.webp`;
        const heroFg = `${import.meta.env.BASE_URL}Hero Home/Hero-Image-Foreground.webp`;
        
        // Simple image preloader
        const preloadImage = (src: string) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        };

        Promise.all([
            preloadImage(heroBg),
            preloadImage(heroFg)
        ]).then(() => {
            // Minimum delay to prevent flash if images are cached
            setTimeout(() => setIsLoading(false), 500);
        }).catch(() => {
            // Failsafe
            setIsLoading(false);
        });
    }, [setIsLoading]);

    return (
        <main>
            <ArchitecturalHero />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />
            <StatsSection />
            <GallerySection />
            <ReviewsSection />
            <ContactSection />
        </main>
    );
};
