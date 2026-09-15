import React from 'react';
import { useSEO } from '../hooks/useSEO.ts';
import { HeroSection } from '../components/public/HeroSection.tsx';
import { FounderSection } from '../components/public/FounderSection.tsx';
import { ProjectsShowcase } from '../components/public/ProjectsShowcase.tsx';
import { ServicesSection } from '../components/public/ServicesSection.tsx';
import { ProcessSection } from '../components/public/ProcessSection.tsx';
import { MaterialsSection } from '../components/public/MaterialsSection.tsx';
import { TrustStatsSection } from '../components/public/TrustStatsSection.tsx';
import { TestimonialsSection } from '../components/public/TestimonialsSection.tsx';
import { FAQSection } from '../components/public/FAQSection.tsx';
import { BlogSection } from '../components/public/BlogSection.tsx';
import { ContactSection } from '../components/public/ContactSection.tsx';

export const HomePage: React.FC = () => {
  useSEO({
    title: 'Luxury Interior Design & Modular Furniture in Surat',
    description: 'Bespoke interior architecture, factory-precision modular furniture, and turnkey project execution across Vadodara, Surat, and Gujarat.',
    canonical: 'https://www.jjinteriors.site/'
  });

  return (
    <div className="w-full">
      <HeroSection />
      <FounderSection />
      <ProjectsShowcase />
      <ServicesSection />
      <ProcessSection />
      <MaterialsSection />
      <TrustStatsSection />
      <TestimonialsSection />
      <FAQSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
};
