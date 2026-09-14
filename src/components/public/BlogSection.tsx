import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react';
import { BlogPost } from '../../types.ts';

export const BlogSection: React.FC = () => {
  const { blogPosts, setActiveBlogModal } = useApp();

  const publishedPosts = blogPosts.filter((b) => b.published);

  return (
    <section id="blog" className="py-24 sm:py-32 bg-[#faf8f5] border-b border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
              Studio Journal &amp; Guides
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#1e1b18] tracking-tight">
              Interior Insights &amp; Design Guides
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl font-light">
              Expert advice on modular ergonomics, wardrobe space planning, and interior budgets in Surat.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium">
            <BookOpen className="w-4 h-4 text-[#c5a059]" />
            <span>Curated by J.J. INTERIORS &amp; MODUTECH</span>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveBlogModal(post)}
              className="group cursor-pointer bg-white border border-[#e8dfd5] hover:border-[#c5a059] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#161412]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-[#1e1b18]/90 text-[#fbf9f5] border border-[#c5a059]/30">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-stone-400 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#c5a059]" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c5a059]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-normal text-[#1e1b18] group-hover:text-[#c5a059] transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f0eae1] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1e1b18] group-hover:text-[#c5a059] transition-colors">
                  <span>Read Full Article</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
