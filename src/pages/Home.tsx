
import { ArchitecturalHero } from '../components/ArchitecturalHero';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { StatsSection } from '../components/StatsSection';
import { GallerySection } from '../components/GallerySection';
import { ReviewsSection } from '../components/ReviewsSection';
import { ContactSection } from '../components/ContactSection';

export const Home = () => {
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
