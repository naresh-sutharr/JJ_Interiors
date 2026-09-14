import { useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  canonical?: string;
}

export const useSEO = ({
  title,
  description,
  keywords,
  type = 'website',
  image,
  canonical
}: SEOProps) => {
  const { businessProfile } = useApp();

  useEffect(() => {
    // 1. Update Title
    const fullTitle = `${title} | ${businessProfile.brandName || 'J.J. INTERIORS & MODUTECH'}`;
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update Meta Keywords
    const finalKeywords = keywords || "Interior Designer in Surat, Interior Design Company in Surat, Modular Kitchen in Surat, Modular Furniture in Surat, Home Interior Designer Surat, Commercial Interior Designer Surat";
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', finalKeywords);

    // 4. Open Graph Meta Tags
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', fullTitle);
    updateOGTag('og:description', description);
    updateOGTag('og:type', type);
    
    if (image) {
      updateOGTag('og:image', image);
    } else if (businessProfile.logoUrl) {
      updateOGTag('og:image', businessProfile.logoUrl);
    }

    // 5. Canonical URL
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

  }, [title, description, keywords, type, image, canonical, businessProfile]);
};
