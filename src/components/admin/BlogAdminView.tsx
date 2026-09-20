import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ImageUploadControl } from '../common/ImageUploadControl.tsx';
import { BlogPost } from '../../types.ts';
import { 
  Sparkles, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  X, 
  Calendar, 
  Clock, 
  Tag, 
  AlertCircle 
} from 'lucide-react';

export const BlogAdminView: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, setActiveBlogModal, showToast } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Design Guide',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    author: 'J.J. INTERIORS & MODUTECH',
    readTime: '5 min read',
    publishedAt: new Date().toISOString().split('T')[0],
    published: true,
    tags: ['Gujarat Interiors', 'Modular Kitchen', 'Architecture']
  });

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Design Guide',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      author: 'J.J. INTERIORS & MODUTECH',
      readTime: '5 min read',
      publishedAt: new Date().toISOString().split('T')[0],
      published: true,
      tags: ['Surat Interiors', 'Modular Kitchen']
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: BlogPost) => {
    setEditingPost(p);
    setFormData({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('Article title is required.', 'error');
      return;
    }

    if (editingPost) {
      updateBlogPost(editingPost.id, formData);
    } else {
      addBlogPost({
        ...formData,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      } as any);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Studio Journal &amp; Articles
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Publish educational guides on modular kitchens, wardrobe planning, and Surat interior budgets.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-[#e2dcd4] rounded overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-stone-900">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/75 text-white">
                  {post.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  post.published ? 'bg-emerald-600 text-white' : 'bg-stone-500 text-white'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-2.5 flex-1">
              <div className="flex items-center gap-3 text-[11px] text-stone-400">
                <span>{post.publishedAt}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="font-display text-xl text-[#1e1b18] font-normal leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-stone-600 line-clamp-3 font-light">
                {post.excerpt}
              </p>
            </div>

            <div className="p-3 bg-[#faf8f5] border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setActiveBlogModal(post)}
                className="text-xs font-semibold text-stone-600 hover:text-[#1e1b18] flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Read Preview</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateBlogPost(post.id, { published: !post.published })}
                  className="p-1.5 text-stone-500 hover:text-stone-800 rounded"
                  title={post.published ? 'Unpublish' : 'Publish'}
                >
                  {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="p-1.5 text-stone-600 hover:text-[#1e1b18] rounded"
                  title="Edit Article"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(post.id)}
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

      {/* Add / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
          <div className="relative w-full max-w-2xl bg-white text-[#1e1b18] shadow-2xl border border-stone-300 rounded overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-center shrink-0">
              <h3 className="font-display text-xl font-normal text-white">
                {editingPost ? 'Edit Journal Article' : 'Draft New Article'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-4 flex-1">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Modular Kitchen Ideas in Surat"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                  >
                    <option value="Design Guide">Design Guide</option>
                    <option value="Modular Kitchens">Modular Kitchens</option>
                    <option value="Wardrobe Trends">Wardrobe Trends</option>
                    <option value="Interior Costs">Interior Costs</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                  />
                </div>
              </div>

              <ImageUploadControl
                label="Cover Image URL"
                value={formData.coverImage || ''}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
              />

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                ></textarea>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Full Article Body (Markdown supported)
                </label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 font-mono"
                  placeholder="### Section Heading&#10;&#10;Paragraph content..."
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="post-published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="accent-[#c5a059]"
                />
                <label htmlFor="post-published" className="text-xs font-semibold text-stone-800">
                  Publish to Live Public Site
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2 shrink-0">
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
                  Save Article
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
              <h4 className="font-bold text-base text-stone-900">Delete Article?</h4>
            </div>
            <p className="text-xs text-stone-600">
              Are you sure you want to delete this blog post?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded text-xs font-semibold">
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteBlogPost(deleteConfirmId);
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
