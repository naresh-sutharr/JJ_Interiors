import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Project } from '../../types.ts';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Copy, 
  Star, 
  Eye, 
  EyeOff, 
  X, 
  Check, 
  Image as ImageIcon,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const ProjectsAdminView: React.FC = () => {
  const { 
    projects, 
    addProject, 
    updateProject, 
    deleteProject, 
    duplicateProject, 
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: 'COMPLETE HOME INTERIOR',
    clientName: '',
    location: 'Surat, Gujarat',
    year: '2025',
    budget: '₹28,00,000',
    status: 'COMPLETED',
    featured: false,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '',
    designConcept: '',
    materials: ['Italian Botticino Marble', 'PU Polish Veneer', 'Modutech BWP Plywood'],
    servicesIncluded: ['Complete Interior Turnkey', 'Modular Kitchen', 'Wardrobes'],
    highlights: ['Bespoke Fluted Panels', 'Acoustic Ceiling', 'Smart Lighting']
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'COMPLETE HOME INTERIOR',
      clientName: '',
      location: 'Surat, Gujarat',
      year: '2025',
      budget: '₹28,00,000',
      status: 'COMPLETED',
      featured: false,
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      ],
      description: '',
      designConcept: '',
      materials: ['Italian Botticino Marble', 'PU Polish Veneer', 'Modutech BWP Plywood'],
      servicesIncluded: ['Complete Interior Turnkey', 'Modular Kitchen'],
      highlights: ['Bespoke Fluted Panels']
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Project) => {
    setEditingProject(p);
    setFormData({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('Project title is required.', 'error');
      return;
    }

    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData as any);
    }
    setIsModalOpen(false);
  };

  const handleTogglePublish = (p: Project) => {
    updateProject(p.id, { published: !p.published });
    showToast(p.published ? 'Project unpublished from site.' : 'Project published to site!');
  };

  const handleToggleFeature = (p: Project) => {
    updateProject(p.id, { featured: !p.featured });
    showToast(p.featured ? 'Removed from featured showcase.' : 'Added to featured showcase!');
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Portfolio &amp; Project Management
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Publish site showcase projects, manage image galleries, execution phases, and client deliverables.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search & Categories Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 border border-[#e2dcd4]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search projects by name, client, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-800 focus:outline-none focus:border-[#c5a059]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'COMPLETE HOME INTERIOR', 'MODULAR KITCHEN', 'COMMERCIAL', 'WARDROBE'].map((cat) => (
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

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-[#e2dcd4] hover:border-[#c5a059] rounded overflow-hidden shadow-sm flex flex-col justify-between transition-all"
          >
            {/* Image Preview */}
            <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              
              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/75 text-[#fbf9f5] border border-white/20">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#c5a059] text-black">
                    Featured
                  </span>
                )}
              </div>

              <div className="absolute top-3 right-3">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  project.published ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                  {project.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 rounded text-[10px] text-white">
                {project.galleryImages?.length || 0} photos
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 space-y-3 flex-1">
              <div>
                <h3 className="font-display text-xl font-normal text-[#1e1b18]">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#c5a059]" />
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>
              </div>

              <div className="text-xs text-stone-600 line-clamp-2 font-light">
                {project.description}
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
                <span className="text-stone-500">Client: <strong>{project.clientName}</strong></span>
                <span className="font-bold text-stone-900">{project.budget}</span>
              </div>
            </div>

            {/* Card Action Controls */}
            <div className="p-3 bg-[#faf8f5] border-t border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleToggleFeature(project)}
                  className={`p-1.5 rounded transition-colors ${project.featured ? 'text-[#c5a059] hover:bg-stone-200' : 'text-stone-400 hover:text-stone-600'}`}
                  title={project.featured ? 'Remove from Featured' : 'Mark as Featured'}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={() => handleTogglePublish(project)}
                  className={`p-1.5 rounded transition-colors ${project.published ? 'text-emerald-700 hover:bg-emerald-50' : 'text-stone-400 hover:text-stone-600'}`}
                  title={project.published ? 'Unpublish from site' : 'Publish to site'}
                >
                  {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => duplicateProject(project.id)}
                  className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded transition-colors"
                  title="Duplicate Project"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setDeleteConfirmId(project.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
          <div className="relative w-full max-w-2xl bg-white text-[#1e1b18] shadow-2xl border border-stone-300 rounded overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-center shrink-0">
              <h3 className="font-display text-xl font-normal text-white">
                {editingProject ? 'Edit Project' : 'Create Portfolio Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-4 flex-1">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Villa Residence"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="COMPLETE HOME INTERIOR">Complete Home Interior</option>
                    <option value="MODULAR KITCHEN">Modular Kitchen</option>
                    <option value="COMMERCIAL">Commercial</option>
                    <option value="WARDROBE">Wardrobe</option>
                    <option value="LIVING ROOM">Living Room</option>
                    <option value="BEDROOM">Bedroom</option>
                    <option value="CUSTOM FURNITURE">Custom Furniture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="Private Client, Dr. Patel, etc."
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Location in Surat
                  </label>
                  <input
                    type="text"
                    placeholder="Vesu, Surat"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Execution Year
                  </label>
                  <input
                    type="text"
                    placeholder="2025"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Investment Budget
                  </label>
                  <input
                    type="text"
                    placeholder="₹25,00,000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Project Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Full scope of design, layout strategy, structural details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                ></textarea>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Design Concept &amp; Philosophy
                </label>
                <textarea
                  rows={2}
                  placeholder="Architectural intention, lighting philosophy, tone palette..."
                  value={formData.designConcept}
                  onChange={(e) => setFormData({ ...formData, designConcept: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                ></textarea>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-[#c5a059] rounded"
                  />
                  <span>Feature on Public Homepage</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="accent-[#c5a059] rounded"
                  />
                  <span>Publish to Live Site</span>
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  {editingProject ? 'Save Changes' : 'Publish Project'}
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
              <h4 className="font-bold text-base text-stone-900">Confirm Deletion</h4>
            </div>
            <p className="text-xs text-stone-600">
              Are you sure you want to delete this project from the portfolio? This will remove it from the public website showcase.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded text-xs font-semibold uppercase"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProject(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold uppercase"
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
