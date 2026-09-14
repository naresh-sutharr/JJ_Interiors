import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { CatalogItem } from '../../types.ts';
import { 
  Layers, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Copy, 
  Check, 
  X, 
  Tag, 
  Sparkles,
  AlertCircle 
} from 'lucide-react';

export const ItemCatalogView: React.FC = () => {
  const { 
    catalogItems, 
    addCatalogItem, 
    updateCatalogItem, 
    deleteCatalogItem, 
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<CatalogItem>>({
    name: '',
    category: 'Modular',
    description: '',
    unit: 'Sq.Ft',
    size: 'Standard',
    material: 'BWP Plywood / Acrylic',
    rate: 1850,
    sku: 'JJ-MOD-01',
    active: true,
  });

  const categories = [
    'ALL',
    'Kitchen',
    'Wardrobe',
    'Furniture',
    'Bedroom',
    'Living Room',
    'Hardware',
    'Woodwork',
    'Modular',
    'Electrical',
    'Other'
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Modular',
      description: '',
      unit: 'Sq.Ft',
      size: 'Standard',
      material: 'BWP Plywood / Acrylic',
      rate: 0,
      sku: `JJ-CAT-${Math.floor(100 + Math.random() * 900)}`,
      active: true,
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CatalogItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.rate) {
      showToast('Item name and rate are required.', 'error');
      return;
    }

    if (editingItem) {
      updateCatalogItem(editingItem.id, formData);
    } else {
      addCatalogItem(formData as any);
    }
    setIsModalOpen(false);
  };

  const handleDuplicate = (item: CatalogItem) => {
    const newItem = {
      ...item,
      name: `${item.name} (Copy)`,
      sku: `${item.sku}-CP`,
    };
    addCatalogItem(newItem as any);
  };

  const filteredItems = catalogItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = categoryFilter === 'ALL' || item.category === categoryFilter;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Rate Master &amp; Item Catalog
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Pre-defined standard architectural and Modutech unit rates for rapid quotation generation.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Catalog Item</span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 border border-[#e2dcd4]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search catalog items, materials, SKUs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-800 focus:outline-none focus:border-[#c5a059]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
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

      {/* Items Table */}
      <div className="bg-white border border-[#e2dcd4] shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#faf8f5] border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Item &amp; SKU</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Material / Spec</th>
              <th className="py-3 px-4">Standard Unit</th>
              <th className="py-3 px-4 text-right">Standard Rate (₹)</th>

              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                <td className="py-3.5 px-4 font-medium text-[#1e1b18]">
                  <div className="font-bold text-stone-900">{item.name}</div>
                  <div className="text-[10px] text-stone-400 font-mono">{item.sku}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 uppercase">
                    {item.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-stone-600">
                  <div>{item.material}</div>
                  <div className="text-[10px] text-stone-400">{item.description}</div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-stone-700">
                  {item.unit}
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-stone-900">
                  ₹{item.rate.toLocaleString('en-IN')}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.active ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-200 text-stone-600'}`}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleDuplicate(item)}
                      className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded"
                      title="Duplicate Item"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-stone-600 hover:text-[#1e1b18] hover:bg-stone-100 rounded"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Catalog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
          <div className="relative w-full max-w-lg bg-white text-[#1e1b18] shadow-2xl border border-stone-300 rounded overflow-hidden my-auto">
            
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-center">
              <h3 className="font-display text-xl font-normal text-white">
                {editingItem ? 'Edit Catalog Item' : 'New Catalog Item'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Item Particular Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modular Acrylic Kitchen Overhead Cabinet"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    {categories.filter(c => c !== 'ALL').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Rate (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Measurement Unit
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Sq.Ft">Sq.Ft (Square Feet)</option>
                    <option value="Rft">Rft (Running Feet)</option>
                    <option value="Nos">Nos (Pieces / Units)</option>
                    <option value="Sets">Sets</option>
                    <option value="L.S.">L.S. (Lump Sum)</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Material &amp; Specification
                </label>
                <input
                  type="text"
                  placeholder="e.g. Action TESA HDHMR, 1mm Acrylic, Hettich hinges"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Description / Inclusions
                </label>
                <textarea
                  rows={2}
                  placeholder="Details for quotation line item breakdown..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
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
                  {editingItem ? 'Save Item' : 'Create Item'}
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
              <h4 className="font-bold text-base text-stone-900">Delete Catalog Item?</h4>
            </div>
            <p className="text-xs text-stone-600">
              This item will be removed from your standard rate catalog. Existing saved bills using this item will remain intact.
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
                  deleteCatalogItem(deleteConfirmId);
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
