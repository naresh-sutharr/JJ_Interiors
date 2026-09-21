import React from 'react';
import { useSEO } from '../hooks/useSEO.ts';
import { useSchema } from '../hooks/useSchema.ts';
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
    title: 'Top Interior Designer in Surat | Modular Kitchens | J.J. Interiors',
    description: 'J.J. INTERIORS & MODUTECH by Mukesh Suthar offers turnkey home interior design, custom modular kitchens, and office interiors in Surat, Vadodara, and Gujarat.',
    keywords: 'interior designer in Surat, modular kitchen Surat, turnkey interior design Surat, home interior designer Surat, custom furniture Surat, Mukesh Suthar',
    canonical: 'https://www.jjinteriors.site/'
  });

  useSchema([
    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": "J.J. INTERIORS & MODUTECH",
      "image": "https://www.jjinteriors.site/mukeshlogo.png",
      "@id": "https://www.jjinteriors.site",
      "url": "https://www.jjinteriors.site",
      "telephone": "+919898412998",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dindoli",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "postalCode": "394210",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.1666,
        "longitude": 72.8333
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        "https://instagram.com/jjinteriors.modutech",
        "https://facebook.com/jjinteriors.modutech",
        "https://youtube.com/@jjinteriors",
        "https://linkedin.com/company/jjinteriors-modutech"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Mukesh Suthar",
      "jobTitle": "Owner & Design Director",
      "url": "https://www.jjinteriors.site",
      "image": "https://www.jjinteriors.site/mukeshbhai.jpeg",
      "worksFor": {
        "@type": "Organization",
        "name": "J.J. INTERIORS & MODUTECH"
      }
    }
  ]);

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
