import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { useSEO } from '../hooks/useSEO.ts';
import { BeforeAfterSlider } from '../components/public/BeforeAfterSlider.tsx';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  MessageSquare, 
  ArrowLeftRight, 
  ChevronRight,
  Share2,
  Heart,
  Maximize2,
  X,
  Play,
  Star,
  Quote,
  Eye,
  Building2,
  Check,
  ChevronLeft
} from 'lucide-react';

interface ProjectDetailPageProps {
  projectSlug?: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectSlug }) => {
  const { 
    projects, 
    publicRoute, 
    navigateTo, 
    openConsultationWithPrefill, 
    businessProfile,
    showToast,
    isProjectSaved,
    toggleSaveProject,
    recordProjectView,
    recordWhatsAppClick
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Derive target slug from prop or publicRoute
  const routeSlug = projectSlug || (publicRoute.startsWith('/projects/') ? publicRoute.replace('/projects/', '') : '');

  // Find matching project
  const project = projects.find((p) => {
    const slugified = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return p.id === routeSlug || slugified === routeSlug || p.id.includes(routeSlug);
  }) || projects[0];

  // Record project view on mount
  useEffect(() => {
    if (project?.id) {
      recordProjectView(project.id);
    }
  }, [project?.id, recordProjectView]);

  useSEO({
    title: project ? `${project.title} - ${project.category}` : 'Project Portfolio',
    description: project?.description || 'Explore our architectural interior projects.',
    canonical: `https://www.jjinteriors.site/projects/${routeSlug}`,
    image: project?.coverImage
  });

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-2xl text-stone-800 mb-2">Project Not Found</h2>
        <p className="text-stone-500 text-sm mb-6">The requested portfolio project could not be located.</p>
        <button
          onClick={() => window.history.length > 2 ? window.history.back() : navigateTo('/projects')}
          className="px-6 py-2.5 bg-[#1e1b18] text-white text-xs uppercase tracking-wider font-semibold"
        >
          Return to All Projects
        </button>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const images = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.coverImage];

  const currentImage = images[activeImageIndex] || project.coverImage;
  const hasBeforeAfter = Boolean(project.beforeImage && project.afterImage);
  const saved = isProjectSaved(project.id);

  const handleShare = () => {
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const shareUrl = `${window.location.origin}/projects/${slug}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedLink(true);
        showToast('Project link copied to clipboard!');
        setTimeout(() => setCopiedLink(false), 3000);
      }).catch(() => {
        showToast('Project link copied!');
      });
    }
  };

  const handleEnquireSimilar = () => {
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const shareUrl = `${window.location.origin}/projects/${slug}`;
    openConsultationWithPrefill({
      projectName: project.title,
      projectUrl: shareUrl,
      serviceName: project.category
    });
  };

  const handleWhatsAppInquire = () => {
    recordWhatsAppClick();
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const shareUrl = `${window.location.origin}/projects/${slug}`;
    const text = `Hello J.J. INTERIORS & MODUTECH, I am viewing your project "${project.title}" (${project.category}, ${project.location}) and would love to enquire about a similar design for my space:\n${shareUrl}`;
    const phone = businessProfile.whatsapp.replace(/[^0-9]/g, '') || '919898412998';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveImageIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  return (
    <div className="w-full bg-[#faf8f5] text-[#1e1b18]">
      
      {/* 1. Breadcrumb & Action Bar */}
      <div className="border-b border-[#e8dfd5] bg-white sticky top-20 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 truncate">
            <button
              onClick={() => window.history.length > 2 ? window.history.back() : navigateTo('/projects')}
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#c5a059] font-medium transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Projects</span>
            </button>
            <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
            <span className="text-[#c5a059] font-semibold truncate max-w-[160px] sm:max-w-xs md:max-w-md">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Save / Moodboard Button */}
            <button
              onClick={() => toggleSaveProject(project.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                saved 
                  ? 'bg-amber-50 text-amber-900 border-amber-300' 
                  : 'bg-white text-stone-600 hover:text-black border-stone-200 hover:border-stone-400'
              }`}
              title={saved ? 'Saved in your collection' : 'Save to Moodboard'}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-amber-600 text-amber-600' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>

            {/* Quick Share */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-black border border-stone-200 hover:border-stone-400 bg-white transition-colors cursor-pointer"
              title="Share Project"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            {/* Primary Enquire Action */}
            <button
              onClick={handleEnquireSimilar}
              className="px-3.5 sm:px-4 py-1.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>Enquire Similar</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero Header: Architectural Case Study Masthead */}
      <section className="bg-[#161412] text-[#faf8f5] pt-12 pb-16 sm:pb-20 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span className="px-2.5 py-1 bg-[#c5a059] text-black text-[10px] font-bold uppercase tracking-widest">
                {project.category}
              </span>

              {project.designStyle && (
                <span className="px-2.5 py-1 bg-white/10 text-stone-300 text-[10px] uppercase tracking-wider font-mono border border-white/10">
                  {project.designStyle}
                </span>
              )}

              <span className="text-xs text-stone-300 font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                {project.location}
              </span>

              <span className="text-stone-500">•</span>
              <span className="text-xs text-stone-300 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                {project.year || '2024'}
              </span>

              {project.area && (
                <>
                  <span className="text-stone-500">•</span>
                  <span className="text-xs text-[#ebd5b3] font-mono flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#c5a059]" />
                    {project.area}
                  </span>
                </>
              )}

              {project.status && (
                <>
                  <span className="text-stone-500">•</span>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {project.status}
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-4">
              {project.title}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
              {project.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-stone-400">
              {project.viewsCount !== undefined && (
                <span className="flex items-center gap-1.5 font-mono">
                  <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{project.viewsCount} Case Study Views</span>
                </span>
              )}
              <span className="text-stone-600">|</span>
              <span className="text-stone-300 font-serif italic">
                Execution by J.J. INTERIORS &amp; MODUTECH Architectural Studio
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Media Visualizer & Interactive Before/After */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-16 relative z-10">
        <div className="bg-white border border-[#e8dfd5] p-3 sm:p-5 shadow-2xl space-y-4">
          
          {/* Mode Switcher Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold">
                {showBeforeAfter ? 'Comparison Mode' : 'Portfolio Imagery'}
              </span>
              <span className="text-xs text-stone-400">
                ({showBeforeAfter ? 'Site Transformation' : `${activeImageIndex + 1} of ${images.length}`})
              </span>
            </div>

            <div className="flex items-center gap-2">
              {hasBeforeAfter && (
                <button
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                    showBeforeAfter ? 'bg-[#c5a059] text-[#141210]' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>{showBeforeAfter ? 'View Gallery' : 'Before & After Slider'}</span>
                </button>
              )}

              {!showBeforeAfter && (
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                  title="Fullscreen Preview"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
              )}
            </div>
          </div>

          {/* Visual Display */}
          {showBeforeAfter && hasBeforeAfter ? (
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              beforeLabel="Raw Site (Before)"
              afterLabel="Completed Handover"
            />
          ) : (
            <div 
              className="relative aspect-[16/9] w-full overflow-hidden bg-[#141210] shadow-inner cursor-zoom-in group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img
                src={currentImage}
                alt={`${project.title} - View ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-101"
              />

              {/* View Overlay Tag */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/75 backdrop-blur-md text-white text-xs font-mono flex items-center gap-2 border border-white/10">
                <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{activeImageIndex + 1} / {images.length} • Click to Enlarge</span>
              </div>
            </div>
          )}

          {/* Thumbnails Carousel */}
          {!showBeforeAfter && images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 sm:w-28 aspect-[16/10] shrink-0 overflow-hidden border-2 cursor-pointer transition-all ${
                    activeImageIndex === idx ? 'border-[#c5a059] scale-102 shadow-md' : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 4. Specifications & Narrative Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Architectural Concept, Video, Testimonial & Highlights */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Design Concept & Intent */}
            {(project.designConcept || project.concept) && (
              <div className="p-6 sm:p-8 bg-white border border-[#e8dfd5] border-l-4 border-l-[#c5a059] shadow-xs">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#c5a059] block mb-2 font-mono">
                  Spatial Philosophy &amp; Concept
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-[#1e1b18] font-normal mb-3">
                  Architectural Intent &amp; Layout Strategy
                </h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                  {project.designConcept || project.concept}
                </p>
              </div>
            )}

            {/* Video Walkthrough (if available) */}
            {project.videoUrl && (
              <div className="bg-white p-6 sm:p-8 border border-[#e8dfd5] shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <Play className="w-5 h-5 text-[#c5a059]" />
                  <h3 className="font-display text-xl text-[#1e1b18] font-normal">
                    Site Walkthrough &amp; Video Tour
                  </h3>
                </div>
                <div className="relative aspect-video w-full overflow-hidden bg-black border border-stone-800">
                  <iframe
                    src={project.videoUrl.replace('watch?v=', 'embed/')}
                    title={`${project.title} Video Tour`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Execution & Joinery Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="bg-white p-6 sm:p-8 border border-[#e8dfd5] shadow-xs">
                <h3 className="font-display text-xl text-[#1e1b18] font-normal mb-4 pb-3 border-b border-[#e8dfd5]">
                  Execution &amp; Joinery Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-normal">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Client Testimonial Quote Card */}
            {project.clientTestimonial && (
              <div className="bg-[#fcfaf7] p-6 sm:p-8 border border-[#ebd5b3] relative shadow-xs">
                <Quote className="w-10 h-10 text-[#c5a059]/25 absolute top-6 right-6 pointer-events-none" />
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-stone-600 ml-2">Verified Client Review</span>
                </div>
                <p className="font-serif italic text-stone-800 text-base sm:text-lg leading-relaxed mb-4">
                  "{project.clientTestimonial.comment}"
                </p>
                <div className="border-t border-[#ebd5b3] pt-3 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-stone-900 text-sm block">
                      {project.clientTestimonial.name}
                    </span>
                    {project.clientTestimonial.role && (
                      <span className="text-xs text-stone-500">
                        {project.clientTestimonial.role}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 border border-[#c5a059]/20">
                    Handed Over Residence
                  </span>
                </div>
              </div>
            )}

            {/* Inquire About Similar Project Card */}
            <div className="bg-gradient-to-r from-[#1e1b18] to-[#2c2825] text-white p-8 border border-[#c5a059]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#c5a059] block mb-1">
                  Enquire About Similar Project
                </span>
                <h4 className="font-display text-2xl text-[#fbf9f5] font-light">
                  Commission this aesthetic for your property.
                </h4>
                <p className="text-stone-400 text-xs sm:text-sm font-light mt-1">
                  Complimentary 3D concept layout, finish selection &amp; transparent quotation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={handleEnquireSimilar}
                  className="px-6 py-3 bg-[#c5a059] hover:bg-[#d8b46d] text-black text-xs uppercase tracking-widest font-bold transition-all text-center cursor-pointer shadow-lg"
                >
                  Enquire Similar
                </button>
                <button
                  onClick={handleWhatsAppInquire}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Project Dossier & Material Palette */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-7 border border-[#e8dfd5] shadow-xs space-y-6">
            <h4 className="font-display text-lg text-[#1e1b18] font-normal pb-3 border-b border-[#e8dfd5] flex items-center justify-between">
              <span>Project Dossier</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a059]">Case Study</span>
            </h4>

            {project.area && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Built-Up Area
                </div>
                <p className="text-sm font-semibold text-[#1e1b18]">
                  {project.area}
                </p>
              </div>
            )}

            {project.designStyle && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Design Language &amp; Style
                </div>
                <p className="text-sm font-semibold text-[#1e1b18]">
                  {project.designStyle}
                </p>
              </div>
            )}

            {project.location && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Project Location
                </div>
                <p className="text-sm font-semibold text-[#1e1b18]">
                  {project.location}
                </p>
              </div>
            )}

            {/* Materials Palette Chips */}
            {project.materials && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Material Palette &amp; Finishes</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.materials.split(',').map((mat, mIdx) => (
                    <span 
                      key={mIdx} 
                      className="text-xs px-2.5 py-1 bg-[#faf8f5] border border-[#e8dfd5] text-stone-800 font-medium rounded-none"
                    >
                      {mat.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Scope of Work */}
            {project.services && project.services.length > 0 && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Services Provided
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.services.map((s, idx) => (
                    <span key={idx} className="text-[11px] uppercase tracking-wider px-2.5 py-1 bg-[#1e1b18] text-white font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.budget && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">
                  Investment Bracket
                </div>
                <p className="text-sm font-semibold text-[#1e1b18]">
                  {project.budget}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#e8dfd5] space-y-2.5">
              <button
                onClick={handleEnquireSimilar}
                className="w-full py-3 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Enquire About Similar Project</span>
              </button>

              <button
                onClick={() => toggleSaveProject(project.id)}
                className={`w-full py-2.5 border text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  saved 
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{saved ? 'Saved in Your Collection' : 'Save to Moodboard'}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Next & Previous Project Navigation */}
      <section className="border-t border-[#e8dfd5] bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <button
              onClick={() => {
                const slug = prevProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                navigateTo(`/projects/${slug}`);
              }}
              className="p-4 text-left border border-stone-200 hover:border-[#c5a059] transition-all group flex items-center gap-4 bg-[#faf8f5] hover:bg-white cursor-pointer"
            >
              <div className="w-16 h-12 overflow-hidden shrink-0 bg-stone-900">
                <img src={prevProject.coverImage} alt={prevProject.title} className="w-full h-full object-cover" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold block">
                  ← Previous Project
                </span>
                <span className="text-xs sm:text-sm font-medium text-stone-800 group-hover:text-[#c5a059] transition-colors truncate block">
                  {prevProject.title}
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                const slug = nextProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                navigateTo(`/projects/${slug}`);
              }}
              className="p-4 text-right border border-stone-200 hover:border-[#c5a059] transition-all group flex items-center justify-end gap-4 bg-[#faf8f5] hover:bg-white cursor-pointer"
            >
              <div className="truncate">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold block">
                  Next Project →
                </span>
                <span className="text-xs sm:text-sm font-medium text-stone-800 group-hover:text-[#c5a059] transition-colors truncate block">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-16 h-12 overflow-hidden shrink-0 bg-stone-900">
                <img src={nextProject.coverImage} alt={nextProject.title} className="w-full h-full object-cover" />
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* 6. Fullscreen Image Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-fade-in">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between text-white/80 max-w-7xl z-10">
            <div className="text-xs sm:text-sm font-light truncate max-w-md">
              <span className="text-[#c5a059] font-medium">{project.title}</span> — Photo {activeImageIndex + 1} of {images.length}
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image in Viewport */}
          <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={currentImage}
              alt=""
              className="max-h-[82vh] max-w-full object-contain shadow-2xl"
            />

            {/* Prev / Next controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer border border-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev + 1) % images.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer border border-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {images.map((thumb, tIdx) => (
              <button
                key={tIdx}
                onClick={() => setActiveImageIndex(tIdx)}
                className={`w-14 h-10 shrink-0 overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === tIdx ? 'border-[#c5a059] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={thumb} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
