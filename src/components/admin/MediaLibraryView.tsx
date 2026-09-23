import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  Image as ImageIcon, 
  Plus, 
  Copy, 
  Check, 
  Search, 
  ExternalLink, 
  X, 
  Sparkles,
  Layers,
  Pencil,
  Trash2
} from 'lucide-react';
import { ImageUploadControl } from '../common/ImageUploadControl.tsx';

interface MediaAsset {
  id: string;
  title: string;
  url: string;
  category: string;
  dimensions: string;
}

export const MediaLibraryView: React.FC = () => {
  const { showToast, mediaItems, addMediaItem, updateMediaItem, deleteMediaItem } = useApp();

  const [localAssets, setLocalAssets] = useState<any[]>([
    {
      id: 'm-1',
      name: 'Vesu Penthouse Double Height Living Room',
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      category: 'Living',
      dimensions: '1920x1080'
    },
    {
      id: 'm-2',
      name: 'Modutech Minimalist Matte Black Modular Kitchen',
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      category: 'Kitchen',
      dimensions: '1920x1080'
    },
    {
      id: 'm-3',
      name: 'Master Suite Fluted Headboard & Acoustical Wood',
      url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      category: 'Bedroom',
      dimensions: '1920x1080'
    },
    {
      id: 'm-4',
      name: 'Diamond Trading Corporate Headquarters Surat',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      category: 'Commercial',
      dimensions: '1920x1080'
    },
    {
      id: 'm-5',
      name: 'Walk-In Modular Wardrobe with Tinted Glass & Backlit Warm LED',
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      category: 'Wardrobe',
      dimensions: '1920x1080'
    },
    {
      id: 'm-6',
      name: 'Handcrafted Fluted Marble Dining & Brass Chandelier',
      url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
      category: 'Dining',
      dimensions: '1920x1080'
    },
    {
      id: 'm-7',
      name: 'Modutech Precision CNC Edge Banding & Factory Joinery',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      category: 'Factory',
      dimensions: '1920x1080'
    },
    {
      id: 'm-8',
      name: 'Italian Statuario Marble Flooring & Brass Inlays',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      category: 'Living',
      dimensions: '1920x1080'
    }
  ]);

  const allAssets = [...mediaItems, ...localAssets];
  
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCat, setNewCat] = useState('Living');

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleCopy = (id: string, url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      showToast('Image URL copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) {
      showToast('Title and image URL are required.', 'error');
      return;
    }
    addMediaItem({
      name: newTitle,
      url: newUrl,
      category: newCat,
      size: 'High-Res',
      type: 'image/jpeg'
    });
    setIsAddOpen(false);
    setNewTitle('');
    setNewUrl('');
  };

  const handleEditMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name || !editingItem.url) {
      showToast('Title and image URL are required.', 'error');
      return;
    }
    
    if (editingItem.id.startsWith('m-')) {
      // It's a local asset
      setLocalAssets(localAssets.map(a => a.id === editingItem.id ? editingItem : a));
      showToast('Local media asset updated!', 'success');
    } else {
      // It's a firestore asset
      updateMediaItem(editingItem.id, editingItem);
    }
    
    setIsEditOpen(false);
    setEditingItem(null);
  };

  const handleDeleteMedia = (id: string) => {
    if (window.confirm('Are you sure you want to delete this media asset?')) {
      if (id.startsWith('m-')) {
        setLocalAssets(localAssets.filter(a => a.id !== id));
        showToast('Local media removed.', 'info');
      } else {
        deleteMediaItem(id);
      }
    }
  };

  const filteredAssets = allAssets.filter((a: any) => {
    const matchesSearch = (a.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || a.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Studio Media &amp; Asset Library
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            1-Click copy of CDN image URLs for direct paste into portfolio showcases, catalogs, and blogs.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Register Media Asset</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 border border-[#e2dcd4]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search media assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-800"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'Living', 'Kitchen', 'Bedroom', 'Wardrobe', 'Commercial', 'Dining', 'Factory'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#1e1b18] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white border border-[#e2dcd4] rounded overflow-hidden shadow-sm group hover:border-[#c5a059] transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
              <img
                src={asset.url}
                alt={asset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-white uppercase tracking-wider">
                  {asset.category}
                </span>
              </div>
            </div>

            <div className="p-3.5 space-y-2">
              <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug">
                {asset.name}
              </h4>

              <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                <span className="text-[10px] text-stone-400 font-mono">
                  {asset.dimensions || 'High-Res'}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingItem(asset);
                      setIsEditOpen(true);
                    }}
                    className="p-1.5 text-stone-400 hover:text-[#c5a059] border border-transparent hover:border-stone-200 rounded transition-colors cursor-pointer"
                    title="Edit Media"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteMedia(asset.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-500 border border-transparent hover:border-stone-200 rounded transition-colors cursor-pointer"
                    title="Delete Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleCopy(asset.id, asset.url)}
                    className="px-2.5 py-1 ml-1 bg-[#faf8f5] hover:bg-[#1e1b18] hover:text-white border border-stone-300 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#c5a059]" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Register Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
          <div className="relative w-full max-w-md bg-white text-[#1e1b18] shadow-2xl border border-stone-300 rounded overflow-hidden my-auto">
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-center">
              <h3 className="font-display text-lg font-normal text-white">
                Register New Media URL
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Bedroom Fluted Paneling"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                >
                  <option value="Living">Living</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Wardrobe">Wardrobe</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Dining">Dining</option>
                  <option value="Factory">Factory</option>
                </select>
              </div>

              <div className="pb-2">
                <ImageUploadControl
                  label="Image Direct HTTPS URL"
                  value={newUrl}
                  onChange={setNewUrl}
                  required
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded text-xs font-semibold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Add Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
          <div className="relative w-full max-w-md bg-white text-[#1e1b18] shadow-2xl border border-stone-300 rounded overflow-hidden my-auto">
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-center">
              <h3 className="font-display text-lg font-normal text-white">
                Edit Media Asset
              </h3>
              <button onClick={() => { setIsEditOpen(false); setEditingItem(null); }} className="p-1 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditMedia} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Bedroom Fluted Paneling"
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                >
                  <option value="Living">Living</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Wardrobe">Wardrobe</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Dining">Dining</option>
                  <option value="Factory">Factory</option>
                </select>
              </div>

              <div className="pb-2">
                <ImageUploadControl
                  label="Image Direct HTTPS URL"
                  value={editingItem.url}
                  onChange={(url) => setEditingItem({ ...editingItem, url })}
                  required
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setIsEditOpen(false); setEditingItem(null); }}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded text-xs font-semibold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
