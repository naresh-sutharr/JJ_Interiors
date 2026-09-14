import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Testimonial } from '../../types.ts';
import { 
  MessageSquare, 
  Plus, 
  Edit2, 
  Trash2, 
  Star, 
  Eye, 
  EyeOff, 
  X, 
  AlertCircle 
} from 'lucide-react';

export const TestimonialsAdminView: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, showToast } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Testimonial>>({
    clientName: '',
    project: '',
    location: 'Surat',
    review: '',
    rating: 5,
    published: true,
  });

  const handleOpenAdd = () => {
    setEditingTestimonial(null);
    setFormData({
      clientName: '',
      project: '4BHK Residence',
      location: 'Vesu, Surat',
      review: '',
      rating: 5,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    setFormData({ ...t });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.review) {
      showToast('Client name and review are required.', 'error');
      return;
    }

    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, formData);
    } else {
      addTestimonial(formData as any);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Client Testimonials Manager
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage genuine client reviews and project feedback showcased on the public website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-[#e2dcd4] p-5 rounded shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                  ))}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  t.published ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-200 text-stone-700'
                }`}>
                  {t.published ? 'Published' : 'Hidden'}
                </span>
              </div>

              <p className="text-xs text-stone-700 italic leading-relaxed mb-4">
                "{t.review}"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-stone-900">{t.clientName}</div>
                <div className="text-[11px] text-stone-500">{t.project} • {t.location}</div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateTestimonial(t.id, { published: !t.published })}
                  className="p-1.5 text-stone-500 hover:text-stone-800 rounded"
                  title={t.published ? 'Unpublish' : 'Publish'}
                >
                  {t.published ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 text-stone-600 hover:text-[#1e1b18] rounded"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(t.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded"
                  title="Delete"
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
          <div className="relative w-full max-w-md bg-white text-[#1e1b18] shadow-2xl border border-stone-300 rounded overflow-hidden my-auto">
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-center">
              <h3 className="font-display text-lg font-normal text-white">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshi Patel"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Project / Residence
                  </label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Location in Surat
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-700">Rating:</span>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="border border-stone-300 rounded px-2 py-1 text-xs"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>

                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="accent-[#c5a059]"
                  />
                  <span>Publish to site</span>
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Save Review
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
              <h4 className="font-bold text-base text-stone-900">Delete Review?</h4>
            </div>
            <p className="text-xs text-stone-600">
              Are you sure you want to remove this testimonial from the system?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded text-xs font-semibold">
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTestimonial(deleteConfirmId);
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
