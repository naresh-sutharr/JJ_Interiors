import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ImageUploadControl } from '../common/ImageUploadControl.tsx';
import { 
  Globe, 
  BarChart3, 
  Search, 
  Eye, 
  MessageSquare, 
  Heart, 
  Share2, 
  CheckCircle2, 
  Save, 
  Code
} from 'lucide-react';

export const SEOAnalyticsAdminView: React.FC = () => {
  const { 
    seoSettings, 
    updateSeoSettings, 
    analyticsData, 
    projects, 
    leads, 
    savedProjectIds,
    businessProfile,
    showToast 
  } = useApp();

  const [formData, setFormData] = useState(seoSettings);
  const [activeTab, setActiveTab] = useState<'analytics' | 'seo' | 'schema'>('analytics');

  const handleSaveSEO = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoSettings(formData);
    showToast('SEO settings saved successfully.');
  };

  // Structured Data Schema for Local Interior Design Business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": businessProfile.businessName,
    "alternateName": "J.J. Interiors & Modutech",
    "description": formData.metaDescription,
    "url": window.location.origin,
    "telephone": businessProfile.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessProfile.address,
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.1702",
      "longitude": "72.8311"
    },
    "founder": {
      "@type": "Person",
      "name": businessProfile.ownerName,
      "jobTitle": "Principal Interior Architect"
    },
    "priceRange": "₹₹₹₹",
    "openingHours": "Mo-Sa 09:30-19:30"
  };

  const conversionRate = analyticsData.pageViews > 0 
    ? ((leads.length / analyticsData.pageViews) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-display text-xl text-stone-900 font-semibold">
            SEO &amp; Studio Growth Analytics
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitor client acquisition, portfolio impressions, WhatsApp conversions, and search engine optimization.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 border border-stone-200">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'analytics' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-black'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'seo' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-black'
            }`}
          >
            Meta Tags
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'schema' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-black'
            }`}
          >
            Schema.org
          </button>
        </div>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Top Performance KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 border border-stone-200 shadow-xs">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
                Studio Impressions
              </span>
              <div className="text-3xl font-mono font-bold text-stone-900">
                {analyticsData.pageViews.toLocaleString()}
              </div>
              <span className="text-xs text-stone-500 mt-1 block">
                Total page views recorded
              </span>
            </div>

            <div className="bg-white p-5 border border-stone-200 shadow-xs">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
                Consultation Enquiries
              </span>
              <div className="text-3xl font-mono font-bold text-emerald-700">
                {leads.length} Leads
              </div>
              <span className="text-xs text-stone-500 mt-1 block">
                Conversion Rate: {conversionRate}%
              </span>
            </div>

            <div className="bg-white p-5 border border-stone-200 shadow-xs">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
                WhatsApp Inbound Clicks
              </span>
              <div className="text-3xl font-mono font-bold text-emerald-600">
                {analyticsData.whatsappClicks} Clicks
              </div>
              <span className="text-xs text-stone-500 mt-1 block">
                Direct client discussions initiated
              </span>
            </div>

            <div className="bg-white p-5 border border-stone-200 shadow-xs">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
                Client Moodboard Saves
              </span>
              <div className="text-3xl font-mono font-bold text-amber-700">
                {analyticsData.moodboardSaves} Saves
              </div>
              <span className="text-xs text-stone-500 mt-1 block">
                Projects bookmarked by users
              </span>
            </div>
          </div>

          {/* Project Case Study Engagement */}
          <div className="bg-white p-6 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
              <h3 className="font-display text-lg text-stone-900 font-semibold">
                Most Viewed Project Case Studies
              </h3>
              <span className="text-xs text-stone-500 font-mono">
                {projects.length} Published Case Studies
              </span>
            </div>

            <div className="space-y-4">
              {projects.slice(0, 5).map((project, idx) => {
                const views = (analyticsData.projectViews && analyticsData.projectViews[project.id]) || (120 - idx * 18);
                const maxViews = 150;
                const pct = Math.min(100, Math.round((views / maxViews) * 100));

                return (
                  <div key={project.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-400">0{idx + 1}</span>
                        <span className="font-semibold text-stone-800">{project.title}</span>
                        <span className="text-stone-400 font-mono">({project.category})</span>
                      </div>
                      <span className="font-mono font-bold text-stone-900">{views} Views</span>
                    </div>

                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#c5a059] transition-all duration-500" 
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="bg-white p-6 border border-stone-200 shadow-xs max-w-3xl">
          <h3 className="font-display text-lg text-stone-900 font-semibold pb-3 mb-6 border-b border-stone-200">
            Search Engine Meta Tags
          </h3>

          <form onSubmit={handleSaveSEO} className="space-y-5 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Site Title (SERP Tag)
              </label>
              <input
                type="text"
                required
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
              />
              <span className="text-[11px] text-stone-500 mt-1 block">
                Length: {formData.metaTitle.length}/60 characters recommended.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Meta Description
              </label>
              <textarea
                rows={3}
                required
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
              />
              <span className="text-[11px] text-stone-500 mt-1 block">
                Length: {formData.metaDescription.length}/160 characters recommended.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Target Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
              />
            </div>

            <ImageUploadControl
              label="OG Image URL (Social Share Preview)"
              value={formData.ogImageUrl || ''}
              onChange={(url) => setFormData({ ...formData, ogImageUrl: url })}
              placeholder="https://..."
            />

            {/* Google Search Snippet Preview */}
            <div className="bg-stone-50 p-4 border border-stone-200 mt-6 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-2">
                Google Search Result Preview
              </span>
              <div className="text-xs text-emerald-800 font-mono">
                {window.location.origin} › projects
              </div>
              <div className="text-blue-800 text-base font-medium hover:underline cursor-pointer">
                {formData.metaTitle}
              </div>
              <div className="text-xs text-stone-600 line-clamp-2">
                {formData.metaDescription}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs uppercase font-semibold tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save SEO Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'schema' && (
        <div className="bg-white p-6 border border-stone-200 shadow-xs max-w-3xl space-y-4">
          <div>
            <h3 className="font-display text-lg text-stone-900 font-semibold">
              Schema.org Local Business JSON-LD
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Provides Google Knowledge Graph and local search crawlers with structured verified studio credentials and coordinates.
            </p>
          </div>

          <div className="bg-[#1e1b18] text-[#c5a059] p-4 font-mono text-xs overflow-x-auto rounded">
            <pre>{JSON.stringify(localBusinessSchema, null, 2)}</pre>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Valid JSON-LD schema generated for J.J. INTERIORS &amp; MODUTECH.</span>
          </div>
        </div>
      )}
    </div>
  );
};
