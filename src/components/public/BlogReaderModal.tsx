import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, Calendar, Clock, User, Share2, Tag, ArrowLeft } from 'lucide-react';

export const BlogReaderModal: React.FC = () => {
  const { activeBlogModal, setActiveBlogModal, showToast } = useApp();

  if (!activeBlogModal) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
      <div className="relative w-full max-w-4xl bg-[#faf8f5] text-[#1e1b18] shadow-2xl border border-[#c5a059]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Sticky Top Bar */}
        <div className="p-4 border-b border-[#e8dfd5] bg-white flex justify-between items-center shrink-0">
          <button
            onClick={() => setActiveBlogModal(null)}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#1e1b18] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-stone-500 hover:text-[#1e1b18] hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveBlogModal(null)}
              className="p-2 text-stone-400 hover:text-[#1e1b18] hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-5 sm:p-10 space-y-8 flex-1">
          
          {/* Article Header */}
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-[11px] uppercase tracking-widest font-semibold px-3 py-1 bg-[#1e1b18] text-[#fbf9f5]">
              {activeBlogModal.category}
            </span>

            <h1 className="font-display text-3xl sm:text-5xl font-light text-[#1e1b18] leading-tight">
              {activeBlogModal.title}
            </h1>

            <div className="flex items-center justify-center gap-4 text-xs text-stone-500 font-medium pt-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#c5a059]" />
                {activeBlogModal.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                {activeBlogModal.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                {activeBlogModal.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image Frame */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#161412] max-w-3xl mx-auto shadow-md">
            <img
              src={activeBlogModal.coverImage}
              alt={activeBlogModal.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Narrative */}
          <div className="max-w-2xl mx-auto prose prose-stone lg:prose-lg font-light text-stone-800 leading-relaxed space-y-4">
            <div className="text-base sm:text-lg text-stone-700 italic border-l-2 border-[#c5a059] pl-4 py-1 mb-6">
              {activeBlogModal.excerpt}
            </div>

            {/* Split content by line breaks */}
            {activeBlogModal.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-display text-2xl font-normal text-[#1e1b18] pt-4 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n- ');
                return (
                  <ul key={idx} className="space-y-1.5 list-disc pl-5 my-3 text-stone-700">
                    {items.map((it, i) => (
                      <li key={i}>{it.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-stone-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {activeBlogModal.tags && activeBlogModal.tags.length > 0 && (
            <div className="max-w-2xl mx-auto pt-6 border-t border-[#e8dfd5] flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-[#c5a059]" />
              {activeBlogModal.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 bg-white border border-[#e8dfd5] text-stone-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
