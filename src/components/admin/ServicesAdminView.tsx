import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ServiceItem } from '../../types.ts';
import { 
  Compass, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  X, 
  Eye, 
  EyeOff,
  Sparkles,
  AlertCircle 
} from 'lucide-react';

export const ServicesAdminView: React.FC = () => {
  const { services, addService, updateService, deleteService, showToast } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: '',
    shortDesc: '',
    fullDesc: '',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    features: ['Precision Factory Joinery', 'High Density Core Board', '10-Year Structural Warranty'],
    active: true,
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      shortDesc: '',
      fullDesc: '',
      icon: 'Layers',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      features: ['Precision Factory Joinery', 'High Density Core Board'],
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: ServiceItem) => {
    setEditingService(s);
    setFormData({ ...s });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('Service title is required.', 'error');
      return;
    }

    if (editingService) {
      updateService(editingService.id, formData);
    } else {
      addService(formData as any);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Services &amp; Disciplines Manager
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Configure architectural and modular service offerings displayed on the public landing page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-[#e2dcd4] rounded overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] bg-stone-900">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  service.active ? 'bg-emerald-600 text-white' : 'bg-stone-500 text-white'
                }`}>
                  {service.active ? 'Active' : 'Disabled'}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1">
              <h3 className="font-display text-xl text-[#1e1b18] font-normal">
                {service.title}
              </h3>
              <p className="text-xs text-stone-600 line-clamp-3 font-light">
                {service.shortDesc}
              </p>

              <div className="pt-2 border-t border-stone-100">
                <div className="text-[11px] font-bold text-stone-700 uppercase mb-1">Key Inclusions:</div>
                <div className="space-y-1">
                  {service.features.map((f, i) => (
                    <div key={i} className="text-xs text-stone-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#faf8f5] border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => updateService(service.id, { active: !service.active })}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1"
              >
                {service.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{service.active ? 'Hide on Site' : 'Show on Site'}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="p-1.5 text-stone-600 hover:text-[#1e1b18] hover:bg-stone-100 rounded"
                  title="Edit Service"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(service.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                  title="Delete Service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
          <div className="relative w-full max-w-lg bg-white text-[#1e1b18] shadow-2xl border border-stone-300 rounded overflow-hidden my-auto">
            
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-center">
              <h3 className="font-display text-xl font-normal text-white">
                {editingService ? 'Edit Service Discipline' : 'Add Service Discipline'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modular Kitchens &amp; Pantries"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                ></textarea>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Comprehensive Scope &amp; Engineering Details
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="srv-active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="accent-[#c5a059]"
                />
                <label htmlFor="srv-active" className="text-xs font-semibold text-stone-800">
                  Active (Display in Public Website Showcase)
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded text-xs font-semibold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Save Service
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in no-print">
          <div className="bg-white p-6 max-w-sm w-full rounded border border-rose-300 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h4 className="font-bold text-base text-stone-900">Delete Service Discipline?</h4>
            </div>
            <p className="text-xs text-stone-600">
              Are you sure you want to remove this discipline? It will be removed from the public website.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded text-xs font-semibold">
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteService(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-1.5 bg-rose-600 text-white rounded text-xs font-semibold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
