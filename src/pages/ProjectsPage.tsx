import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { useSEO } from '../hooks/useSEO.ts';
import { 
  ArrowUpRight, 
  MapPin, 
  Calendar, 
  Layers, 
  Filter, 
  ChevronRight,
  Sparkles,
  Heart,
  Eye
} from 'lucide-react';

type FilterTab = 'all' | 'residential' | 'modular-kitchen' | 'wardrobe' | 'living-room' | 'bedroom' | 'commercial' | 'custom-furniture';

export const ProjectsPage: React.FC = () => {
  const { 
    projects, 
    setIsConsultationModalOpen, 
    navigateTo, 
    isProjectSaved, 
    toggleSaveProject,
    savedProjectIds
  } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<FilterTab>('all');

  useSEO({
    title: 'Architectural Portfolio | Interior Design Projects in Surat',
    description: 'Explore our selected works, residential interiors, modular kitchens, and commercial headquarters executed with European CNC precision.',
    canonical: 'https://www.jjinteriors.site/projects'
  });

  const categories: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'modular-kitchen', label: 'Modular Kitchen' },
    { id: 'wardrobe', label: 'Wardrobe' },
    { id: 'living-room', label: 'Living Room' },
    { id: 'bedroom', label: 'Bedroom' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'custom-furniture', label: 'Custom Furniture' },
  ];

  const matchesCategory = (categoryStr: string, tab: FilterTab) => {
    if (tab === 'all') return true;
    const cat = categoryStr.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return cat.includes(tab);
  };

  const filteredProjects = projects.filter((project) => matchesCategory(project.category, selectedCategory));

  return (
    <div className="w-full bg-[#faf8f5] text-[#1e1b18]">
      
      {/* 1. Page Hero Banner */}
      <section className="relative bg-[#161412] text-[#faf8f5] py-20 sm:py-28 overflow-hidden border-b border-[#c5a059]/30">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-[#161412]/70 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a059] mb-6">
            <button 
              type="button" 
              onClick={() => navigateTo('/')} 
              className="hover:underline cursor-pointer opacity-80 hover:opacity-100"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-stone-500" />
            <span className="text-stone-300 font-semibold">Projects Portfolio</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-[#c5a059]/40 text-xs font-semibold uppercase tracking-[0.22em] text-[#ebd5b3] mb-4">
              Realized Architecture &amp; Interiors
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#fbf9f5] tracking-tight leading-[1.05] mb-6">
              Projects &amp; Spaces <br />
              <span className="italic font-normal text-[#e8d5b8]">Executed Across Gujarat.</span>
            </h1>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Explore our completed portfolio of bespoke residences, European modular kitchens, and contemporary corporate headquarters.
            </p>
          </div>
        </div>
      </section>

      {/* Moodboard Notification Banner if items saved */}
      {savedProjectIds.length > 0 && (
        <div className="bg-[#ebd5b3]/40 border-b border-[#ebd5b3] px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              <span className="text-stone-800 font-medium">
                You have <strong>{savedProjectIds.length}</strong> saved {savedProjectIds.length === 1 ? 'project' : 'projects'} in your moodboard collection.
              </span>
            </div>
            <button
              onClick={() => navigateTo('/saved-projects')}
              className="text-[#1e1b18] font-bold underline hover:text-[#c5a059] uppercase tracking-wider text-[11px] cursor-pointer"
            >
              View Moodboard →
            </button>
          </div>
        </div>
      )}

      {/* 2. Filterable Categories Bar */}
      <section className="sticky top-20 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8dfd5] py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-stone-400 uppercase tracking-widest font-semibold mr-2">
                <Filter className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Filter:</span>
              </span>

              {categories.map((cat) => {
                const count = projects.filter((p) => matchesCategory(p.category, cat.id)).length;
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-none flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#1e1b18] text-[#faf8f5] border border-[#c5a059]'
                        : 'bg-white text-stone-600 border border-[#e8dfd5] hover:border-stone-400 hover:text-black'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#c5a059] text-black font-bold' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Inquire Shortcut */}
            <div className="hidden sm:flex items-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => setIsConsultationModalOpen(true)}
                className="px-4 py-2 bg-[#c5a059] hover:bg-[#d8b46d] text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Inquire For Your Site
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Projects Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="space-y-8">
          
          {filteredProjects.length === 0 ? (
            <div className="p-16 text-center bg-white border border-[#e8dfd5] max-w-lg mx-auto">
              <p className="text-stone-500 text-sm">No projects found in this category.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-4 py-2 bg-[#1e1b18] text-white text-xs uppercase tracking-wider font-semibold"
              >
                View All Projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const saved = isProjectSaved(project.id);

                return (
                  <div
                    key={project.id}
                    onClick={() => navigateTo(`/projects/${slug}`)}
                    className="group bg-white border border-[#e8dfd5] hover:border-[#c5a059] transition-all duration-500 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl flex flex-col justify-between"
                  >
                    {/* Project Photograph */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#1e1b18]">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                      
                      {/* Category & Featured Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 bg-[#1e1b18]/85 backdrop-blur-md text-[10px] font-semibold tracking-widest uppercase text-[#ebd5b3] border border-[#c5a059]/40">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="px-2 py-1 bg-[#c5a059] text-black text-[9px] font-bold uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Bookmark / Heart Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveProject(project.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-all cursor-pointer shadow-md ${
                          saved ? 'bg-white text-amber-600' : 'bg-black/50 hover:bg-black/80 text-white'
                        }`}
                        title={saved ? 'Saved in Moodboard' : 'Save to Moodboard'}
                        aria-label="Save to Moodboard"
                      >
                        <Heart className={`w-4 h-4 ${saved ? 'fill-amber-600' : ''}`} />
                      </button>

                      {/* Before / After Available Indicator */}
                      {project.beforeImage && project.afterImage && (
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2 py-0.5 bg-black/80 backdrop-blur-xs text-[#c5a059] text-[9px] uppercase tracking-wider font-mono border border-[#c5a059]/30">
                            Before / After Slider
                          </span>
                        </div>
                      )}

                      {/* View Project Pill on Hover */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="p-2 bg-[#faf8f5] text-[#1e1b18] rounded-none flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider shadow-lg">
                          <span>View Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a059]" />
                        </span>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#c5a059]" />
                            <span>{project.location}</span>
                          </span>
                          <span>•</span>
                          <span>{project.year || '2024'}</span>
                          {project.area && (
                            <>
                              <span>•</span>
                              <span>{project.area}</span>
                            </>
                          )}
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-normal text-[#1e1b18] group-hover:text-[#8c6f50] transition-colors leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-stone-600 font-light mt-2 line-clamp-2 leading-relaxed">
                          {project.shortDesc || project.description}
                        </p>
                      </div>

                      {/* Scope & Card Action */}
                      <div className="pt-4 border-t border-[#f0eae1] flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-stone-500 uppercase">
                          {project.scope || 'Full Turnkey'}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#c5a059] font-semibold text-xs uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            <span>Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 4. CTA to Start a Project */}
      <section className="py-20 sm:py-24 bg-[#1e1b18] text-[#faf8f5] border-t border-[#c5a059]/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-3">
            Commission Your Project
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[#faf8f5] tracking-tight mb-6">
            Ready to Begin Your Project Journey?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Let us transform your residential blueprint or commercial space with factory-precision modular joinery and complete turnkey execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsConsultationModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#c5a059] hover:bg-[#d8b46d] text-[#141210] text-xs font-bold uppercase tracking-[0.2em] transition-colors shadow-lg cursor-pointer"
            >
              Start Your Project
            </button>

            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Contact Design Studio</span>
              <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
