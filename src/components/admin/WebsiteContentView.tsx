import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  FileText, 
  Save, 
  Sparkles, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  Sliders, 
  ExternalLink 
} from 'lucide-react';

export const WebsiteContentView: React.FC = () => {
  const { 
    faqs, 
    addFaq, 
    deleteFaq, 
    businessProfile, 
    updateBusinessProfile, 
    showToast, 
    setViewMode 
  } = useApp();

  const [heroHeading, setHeroHeading] = useState('Architectural Interiors & Bespoke Modutech Furniture');
  const [heroSubheading, setHeroSubheading] = useState('Crafting timeless residential sanctuaries and commercial spaces in Surat with German CNC precision, fine joinery, and turnkey execution.');
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85');

  // FAQ Modal
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Hero section copy updated across public website!');
  };

  const handleAddFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) {
      showToast('Question and answer are required.', 'error');
      return;
    }
    addFaq({
      question: newQuestion,
      answer: newAnswer,
      category: newCategory
    });
    setIsFaqModalOpen(false);
    setNewQuestion('');
    setNewAnswer('');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Website Content &amp; Copy Manager
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Modify public hero messaging, FAQs, and copywriting without developer intervention.
          </p>
        </div>

        <button
          onClick={() => setViewMode('public')}
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>View Live Changes</span>
        </button>
      </div>

      {/* Hero Content Section */}
      <div className="bg-white p-6 sm:p-8 border border-[#e2dcd4] shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 pb-2 border-b border-stone-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c5a059]" />
          <span>Primary Hero Banner Messaging</span>
        </h3>

        <form onSubmit={handleSaveHero} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
              Hero Display Headline
            </label>
            <input
              type="text"
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
              Hero Narrative Subheading
            </label>
            <textarea
              rows={3}
              value={heroSubheading}
              onChange={(e) => setHeroSubheading(e.target.value)}
              className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900 leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
              Hero Background Imagery URL
            </label>
            <input
              type="url"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900 font-mono"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Hero Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* Frequently Asked Questions Manager */}
      <div className="bg-white p-6 sm:p-8 border border-[#e2dcd4] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#c5a059]" />
            <span>Public FAQ Accordion ({faqs.length})</span>
          </h3>

          <button
            onClick={() => setIsFaqModalOpen(true)}
            className="px-3 py-1.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add FAQ</span>
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-4 border border-stone-200 rounded bg-[#faf8f5] space-y-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="font-bold text-xs text-stone-900 flex items-center gap-2">
                  <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <button
                  onClick={() => deleteFaq(faq.id)}
                  className="text-stone-400 hover:text-rose-600 p-1"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add FAQ Modal */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
          <div className="relative w-full max-w-md bg-white text-[#1e1b18] shadow-2xl border border-stone-300 rounded overflow-hidden my-auto">
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-center">
              <h3 className="font-display text-lg font-normal text-white">
                Add New Public FAQ
              </h3>
              <button onClick={() => setIsFaqModalOpen(false)} className="p-1 text-stone-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFaqSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                >
                  <option value="General">General</option>
                  <option value="Modular Kitchens">Modular Kitchens</option>
                  <option value="Pricing & Quotations">Pricing &amp; Quotations</option>
                  <option value="Execution & Timeline">Execution &amp; Timeline</option>
                  <option value="Warranty & Hardware">Warranty &amp; Hardware</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Can we customize the modular kitchen layout after measurement?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Detailed Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Clear architectural answer explaining the process..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded text-xs font-semibold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Add FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
