import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  Heart, 
  ArrowLeft, 
  Trash2, 
  MessageSquare, 
  MapPin, 
  Layers, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

export const SavedProjectsPage: React.FC = () => {
  const { 
    projects, 
    savedProjectIds, 
    toggleSaveProject, 
    navigateTo, 
    businessProfile,
    openConsultationWithPrefill,
    recordWhatsAppClick 
  } = useApp();

  const savedProjects = projects.filter((p) => savedProjectIds.includes(p.id));

  const handleShareCollectionToWhatsApp = () => {
    recordWhatsAppClick();
    const projectNames = savedProjects.map((p) => `• ${p.title} (${p.category})`).join('\n');
    const text = `Hello J.J. INTERIORS & MODUTECH, I have curated a moodboard of ${savedProjects.length} projects from your portfolio that I love:\n\n${projectNames}\n\nI would like to discuss my property renovation with your design studio.`;
    const phone = businessProfile.whatsapp.replace(/[^0-9]/g, '') || '919427054921';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-[#faf8f5] text-[#1e1b18] min-h-[85vh]">
      
      {/* 1. Header Banner */}
      <section className="bg-[#161412] text-[#faf8f5] py-16 sm:py-20 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a059] mb-4">
            <button
              onClick={() => navigateTo('/projects')}
              className="hover:underline cursor-pointer opacity-80 hover:opacity-100 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#c5a059]/40 text-xs font-semibold uppercase tracking-[0.22em] text-[#ebd5b3] mb-4">
                <Heart className="w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
                <span>Personal Moodboard &amp; Collection</span>
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                Saved Projects
              </h1>
              <p className="text-stone-300 text-sm sm:text-base font-light mt-2 max-w-xl">
                Your curated selection of spaces, layouts, and joinery finishes. Share this collection with our design team to guide your project quote.
              </p>
            </div>

            {savedProjects.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleShareCollectionToWhatsApp}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Share Moodboard via WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {savedProjects.length === 0 ? (
          <div className="bg-white border border-[#e8dfd5] p-12 text-center max-w-xl mx-auto shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-[#c5a059] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="font-display text-2xl text-[#1e1b18] mb-2 font-normal">
              Your Moodboard is Empty
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed mb-6">
              Browse our bespoke portfolio and tap the heart icon on any project card or case study to build your personal inspiration collection.
            </p>
            <button
              onClick={() => navigateTo('/projects')}
              className="px-6 py-3 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
            >
              Explore Portfolio Projects
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#e8dfd5] pb-4">
              <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold font-mono">
                {savedProjects.length} Saved {savedProjects.length === 1 ? 'Design' : 'Designs'}
              </div>
              <button
                onClick={() => {
                  savedProjects.forEach((p) => toggleSaveProject(p.id));
                }}
                className="text-xs text-stone-500 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedProjects.map((project) => {
                const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <div
                    key={project.id}
                    className="group bg-white border border-[#e8dfd5] hover:border-[#c5a059] transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl flex flex-col justify-between"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-stone-900">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-[#1e1b18]/85 text-[#ebd5b3] text-[10px] font-semibold tracking-widest uppercase border border-[#c5a059]/40">
                          {project.category}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => toggleSaveProject(project.id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-red-600 rounded-full shadow-md cursor-pointer transition-colors"
                        title="Remove from collection"
                      >
                        <Heart className="w-4 h-4 fill-red-600" />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono mb-2">
                          <MapPin className="w-3 h-3 text-[#c5a059]" />
                          <span>{project.location}</span>
                          <span>•</span>
                          <span>{project.year || '2024'}</span>
                        </div>
                        <h3 className="font-display text-xl text-[#1e1b18] group-hover:text-[#8c6f50] transition-colors leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-xs text-stone-600 font-light mt-2 line-clamp-2 leading-relaxed">
                          {project.shortDesc || project.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#f0eae1] flex items-center justify-between gap-2">
                        <button
                          onClick={() => navigateTo(`/projects/${slug}`)}
                          className="text-xs font-semibold uppercase tracking-wider text-[#1e1b18] hover:text-[#c5a059] flex items-center gap-1 cursor-pointer"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openConsultationWithPrefill({
                            projectName: project.title,
                            projectUrl: `${window.location.origin}/projects/${slug}`,
                            serviceName: project.category
                          })}
                          className="px-3 py-1.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                        >
                          Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inquire for all saved projects */}
            <div className="mt-12 p-8 bg-gradient-to-r from-[#1e1b18] to-[#2c2825] text-white border border-[#c5a059]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#c5a059] block mb-1">
                  Ready to translate inspiration into reality?
                </span>
                <h4 className="font-display text-2xl text-[#fbf9f5] font-light">
                  Book a direct consultation using this moodboard.
                </h4>
                <p className="text-stone-400 text-xs sm:text-sm font-light mt-1">
                  Our principal architect will review your {savedProjects.length} saved styles and prepare a personalized walkthrough.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                <button
                  onClick={() => openConsultationWithPrefill({
                    projectName: `${savedProjects.length} Selected Moodboard Spaces`,
                    serviceName: 'Full Home Interior & Modular Architecture'
                  })}
                  className="px-6 py-3 bg-[#c5a059] hover:bg-[#d8b46d] text-black text-xs uppercase tracking-widest font-bold transition-all text-center cursor-pointer shadow-lg"
                >
                  Book Consultation
                </button>
                <button
                  onClick={handleShareCollectionToWhatsApp}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Moodboard</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
