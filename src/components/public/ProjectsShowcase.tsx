import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Project } from '../../types.ts';
import { MapPin, Calendar, ArrowUpRight, Filter } from 'lucide-react';

export const ProjectsShowcase: React.FC = () => {
  const { projects, navigateTo, isProjectSaved, toggleSaveProject } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Filter Categories
  const filterCategories = [
    'ALL',
    'RESIDENTIAL',
    'COMMERCIAL',
    'MODULAR',
    'KITCHEN',
    'WARDROBE',
    'OFFICE'
  ];

  const publishedProjects = projects.filter((p) => p.published);

  const filteredProjects = selectedCategory === 'ALL'
    ? publishedProjects
    : publishedProjects.filter((p) => {
        const cat = p.category.toLowerCase();
        const title = p.title.toLowerCase();
        const services = (p.services || []).map(s => s.toLowerCase());

        switch (selectedCategory) {
          case 'RESIDENTIAL':
            return cat.includes('residential') || cat.includes('bedroom') || cat.includes('living') || services.some(s => s.includes('residential'));
          case 'COMMERCIAL':
            return cat.includes('commercial') || cat.includes('office') || services.some(s => s.includes('commercial'));
          case 'MODULAR':
            return cat.includes('modular') || cat.includes('kitchen') || cat.includes('wardrobe') || services.some(s => s.includes('modular') || s.includes('modutech'));
          case 'KITCHEN':
            return cat.includes('kitchen') || title.includes('kitchen') || services.some(s => s.includes('kitchen'));
          case 'WARDROBE':
            return cat.includes('wardrobe') || title.includes('wardrobe') || services.some(s => s.includes('wardrobe'));
          case 'OFFICE':
            return cat.includes('office') || cat.includes('commercial') || title.includes('headquarters');
          default:
            return p.category.toUpperCase() === selectedCategory;
        }
      });

  const openProjectDetail = (p: Project) => {
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    navigateTo(`/projects/${slug}`);
  };

  return (
    <section id="projects" className="py-24 sm:py-32 bg-[#faf8f5] border-b border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
              Selected Works &amp; Architecture
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#1e1b18] tracking-tight leading-[1.05]">
              Built Spaces. <br />
              <span className="italic font-normal text-[#8c6f50]">Enduring Proportions.</span>
            </h2>
          </div>

          <p className="text-stone-600 text-sm max-w-md font-light leading-relaxed">
            Every residence and corporate workspace is custom-engineered using European CNC accuracy, natural veneers, and integrated architectural lighting.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-16 scrollbar-none border-b border-[#e8dfd5]">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-stone-400 uppercase tracking-widest mr-4 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Discipline:</span>
          </div>
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1e1b18] text-[#faf8f5] border-b-2 border-[#c5a059] shadow-sm'
                  : 'bg-white text-stone-600 hover:text-[#1e1b18] hover:bg-[#f0eae1] border border-[#e8dfd5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetrical Editorial Portfolio Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#e8dfd5] p-8">
            <p className="text-stone-500 text-sm">No projects found matching the selected discipline.</p>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* 1. Large Feature Project (Top of Portfolio) */}
            {filteredProjects[0] && (
              <div 
                onClick={() => openProjectDetail(filteredProjects[0])}
                className="group cursor-pointer bg-[#1e1b18] text-white overflow-hidden shadow-2xl relative grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* Large Photography Frame */}
                <div className="lg:col-span-8 relative aspect-[16/10] lg:aspect-auto min-h-[360px] lg:min-h-[540px] overflow-hidden">
                  <img
                    src={filteredProjects[0].coverImage}
                    alt={filteredProjects[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                  
                </div>

                {/* Editorial Meta Panel */}
                <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-between bg-[#1e1b18] border-t lg:border-t-0 lg:border-l border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a059]">
                      <span>{filteredProjects[0].category}</span>
                      <span>•</span>
                      <span>{filteredProjects[0].year}</span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl font-light text-[#faf8f5] group-hover:text-[#c5a059] transition-colors leading-tight">
                      {filteredProjects[0].title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{filteredProjects[0].location}</span>
                    </div>

                    <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed pt-2">
                      {filteredProjects[0].description}
                    </p>

                    {filteredProjects[0].materials && (
                      <div className="pt-2 text-xs text-stone-400">
                        <span className="text-[#c5a059] font-medium uppercase tracking-wider text-[10px] block mb-1">
                          Key Materials:
                        </span>
                        <span className="italic">{filteredProjects[0].materials}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 flex items-center justify-between border-t border-white/10 text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059]">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Two Companion Projects Side-by-Side (Asymmetrical 2-Column) */}
            {(filteredProjects[1] || filteredProjects[2]) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {[filteredProjects[1], filteredProjects[2]].filter(Boolean).map((project) => (
                  <div
                    key={project.id}
                    onClick={() => openProjectDetail(project)}
                    className="group cursor-pointer bg-white border border-[#e8dfd5] hover:border-[#c5a059] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#1e1b18]">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-[#1e1b18]/85 backdrop-blur-md px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest text-[#c5a059] border border-[#c5a059]/30">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-white space-y-4">
                      <div>
                        <div className="flex justify-between items-center text-xs text-stone-500 mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                            {project.location}
                          </span>
                          <span className="font-mono">{project.year}</span>
                        </div>

                        <h4 className="font-display text-2xl font-light text-[#1e1b18] group-hover:text-[#8c6f50] transition-colors leading-snug">
                          {project.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-stone-600 font-light line-clamp-2 mt-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#e8dfd5] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1e1b18] group-hover:text-[#8c6f50]">
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Full-Width Architectural Project (Project 3 if exists) */}
            {filteredProjects[3] && (
              <div
                onClick={() => openProjectDetail(filteredProjects[3])}
                className="group cursor-pointer relative overflow-hidden bg-[#1e1b18] text-white shadow-2xl"
              >
                <div className="relative aspect-[21/9] sm:aspect-[24/9] min-h-[300px] w-full overflow-hidden">
                  <img
                    src={filteredProjects[3].coverImage}
                    alt={filteredProjects[3].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b18] via-[#1e1b18]/60 to-transparent" />
                  
                  {/* Floating Content Banner */}
                  <div className="absolute inset-y-0 left-0 p-6 sm:p-12 flex flex-col justify-center max-w-xl">
                    <div className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#c5a059] mb-2">
                      {filteredProjects[3].category} • {filteredProjects[3].year}
                    </div>
                    <h3 className="font-display text-3xl sm:text-5xl font-light text-[#faf8f5] group-hover:text-[#c5a059] transition-colors leading-tight mb-3">
                      {filteredProjects[3].title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-300 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{filteredProjects[3].location}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#faf8f5] group-hover:text-[#c5a059] transition-colors">
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
