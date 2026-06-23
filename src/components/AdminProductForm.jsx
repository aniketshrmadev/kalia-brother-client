import { useState } from 'react';
import { HiPlus, HiX, HiUpload } from 'react-icons/hi';
import toast from 'react-hot-toast';

const defaultVariant = { color: '', colorHex: '#000000', images: [], sizes: [] };
const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

export default function AdminProductForm({ product, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || 'T-Shirts',
    description: product?.description || '',
    fabric: product?.fabric || '',
    price: product?.price ?? '',
    isFeatured: product?.isFeatured || false,
    isActive: product?.isActive ?? true,
    variants: product?.variants?.length ? product.variants : [{ ...defaultVariant }],
  });

  const [uploading, setUploading] = useState(false);

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const updateVariant = (index, key, value) => {
    const updated = [...form.variants];
    updated[index] = { ...updated[index], [key]: value };
    setForm(prev => ({ ...prev, variants: updated }));
  };

  const addVariant = () => {
    setForm(prev => ({ ...prev, variants: [...prev.variants, { ...defaultVariant }] }));
  };

  const removeVariant = (index) => {
    setForm(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const toggleSize = (variantIndex, size) => {
    const updated = [...form.variants];
    const v = updated[variantIndex];
    const exists = v.sizes.find(s => s.size === size);
    if (exists) {
      v.sizes = v.sizes.filter(s => s.size !== size);
    } else {
      v.sizes = [...v.sizes, { size, stock: 0 }];
    }
    setForm(prev => ({ ...prev, variants: updated }));
  };

  const updateStock = (variantIndex, size, stock) => {
    const updated = [...form.variants];
    const v = updated[variantIndex];
    const s = v.sizes.find(s => s.size === size);
    if (s) s.stock = Number(stock);
    setForm(prev => ({ ...prev, variants: updated }));
  };

  const handleImageUpload = async (e, variantIndex) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          continue;
        }
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        uploaded.push(dataUrl);
      }
      if (uploaded.length) {
        const updated = [...form.variants];
        updated[variantIndex].images = [...updated[variantIndex].images, ...uploaded];
        setForm(prev => ({ ...prev, variants: updated }));
        toast.success(`${uploaded.length} image(s) added`);
      }
    } catch {
      toast.error('Upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description || !form.fabric) {
      return toast.error('Fill all required fields');
    }
    for (let i = 0; i < form.variants.length; i++) {
      const v = form.variants[i];
      if (!v.color) {
        return toast.error(`Variant ${i + 1}: color name is required`);
      }
      if (v.sizes.length === 0) {
        return toast.error(`Variant ${i + 1}: select at least one size`);
      }
    }
    const payload = {
      ...form,
      price: Number(form.price),
      variants: form.variants.map(v => ({
        ...v,
        sizes: v.sizes.map(s => ({ size: s.size, stock: Number(s.stock) })),
      })),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-kalia-gold">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <button type="button" onClick={onClose} className="text-kalia-muted hover:text-kalia-offwhite p-1 transition-colors">
          <HiX size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-kalia-muted mb-1.5 block">Product Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => updateField('name', e.target.value)}
            className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-4 py-2.5 text-kalia-offwhite focus:outline-none focus:border-kalia-gold transition-colors"
            required
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-kalia-muted mb-1.5 block">Category *</label>
          <select
            value={form.category}
            onChange={e => updateField('category', e.target.value)}
            className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-4 py-2.5 text-kalia-offwhite focus:outline-none focus:border-kalia-gold transition-colors"
          >
            {['T-Shirts', 'Shirts', 'Pants', 'Shorts', 'Watches', 'Belts', 'Perfume', 'Accessories'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-kalia-muted mb-1.5 block">Price (₹) *</label>
          <input
            type="number"
            value={form.price}
            onChange={e => updateField('price', e.target.value)}
            className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-4 py-2.5 text-kalia-offwhite focus:outline-none focus:border-kalia-gold transition-colors"
            required
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-kalia-muted mb-1.5 block">Fabric *</label>
          <input
            type="text"
            value={form.fabric}
            onChange={e => updateField('fabric', e.target.value)}
            className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-4 py-2.5 text-kalia-offwhite focus:outline-none focus:border-kalia-gold transition-colors"
            placeholder="e.g. Cotton, Silk"
          />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-wider text-kalia-muted mb-1.5 block">Description *</label>
        <textarea
          value={form.description}
          onChange={e => updateField('description', e.target.value)}
          rows={3}
          className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-4 py-2.5 text-kalia-offwhite focus:outline-none focus:border-kalia-gold resize-none transition-colors"
          required
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={e => updateField('isFeatured', e.target.checked)}
            className="accent-kalia-gold w-4 h-4"
          />
          <span className="text-sm text-kalia-offwhite">Featured on Homepage</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={e => updateField('isActive', e.target.checked)}
            className="accent-kalia-gold w-4 h-4"
          />
          <span className="text-sm text-kalia-offwhite">Active</span>
        </label>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="outline-label">Variants</h3>
          <button type="button" onClick={addVariant} className="text-kalia-gold text-sm flex items-center gap-1 hover:underline">
            <HiPlus /> Add Variant
          </button>
        </div>

        {form.variants.map((v, vi) => (
          <div key={vi} className="glass-card rounded-xl p-5 mb-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-kalia-muted">Variant {vi + 1}</span>
              {form.variants.length > 1 && (
                <button type="button" onClick={() => removeVariant(vi)} className="text-kalia-pink text-xs hover:underline">
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-kalia-muted mb-1 block">Color Name</label>
                <input
                  type="text"
                  value={v.color}
                  onChange={e => updateVariant(vi, 'color', e.target.value)}
                  className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-3 py-2 text-sm text-kalia-offwhite focus:outline-none focus:border-kalia-gold transition-colors"
                  placeholder="Navy Blue"
                />
              </div>
              <div>
                <label className="text-xs text-kalia-muted mb-1 block">Color Hex</label>
                <input
                  type="color"
                  value={v.colorHex}
                  onChange={e => updateVariant(vi, 'colorHex', e.target.value)}
                  className="w-full h-10 bg-kalia-bg/60 border border-kalia-border/50 rounded-xl cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-kalia-muted mb-1 block">Images</label>
                <label className="flex items-center gap-2 bg-kalia-bg/60 border border-kalia-border/50 rounded-xl px-3 py-2 cursor-pointer hover:border-kalia-gold transition-colors">
                  <HiUpload size={16} className="text-kalia-gold" />
                  <span className="text-sm text-kalia-offwhite">{uploading ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e => handleImageUpload(e, vi)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {v.images.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {v.images.map((img, ii) => (
                  <div key={ii} className="relative w-16 h-20 rounded-xl overflow-hidden border border-kalia-border/50">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        const imgs = [...v.images];
                        imgs.splice(ii, 1);
                        updateVariant(vi, 'images', imgs);
                      }}
                      className="absolute top-0 right-0 bg-kalia-pink text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="text-xs text-kalia-muted mb-2 block">Sizes & Stock</label>
              <div className="grid grid-cols-5 gap-2">
                {allSizes.map(size => {
                  const sizeData = v.sizes.find(s => s.size === size);
                  const active = !!sizeData;
                  return (
                    <div key={size} className="text-center">
                      <button
                        type="button"
                        onClick={() => toggleSize(vi, size)}
                        className={`w-full py-1.5 rounded-full text-xs font-medium border mb-1 transition-all duration-300 ${
                          active ? 'bg-kalia-gold text-kalia-bg border-kalia-gold' : 'border-kalia-border/50 text-kalia-muted'
                        }`}
                      >
                        {size}
                      </button>
                      {active && (
                        <input
                          type="number"
                          min={0}
                          value={sizeData.stock}
                          onChange={e => updateStock(vi, size, e.target.value)}
                          className="w-full bg-kalia-bg/60 border border-kalia-border/50 rounded-lg px-1 py-0.5 text-xs text-kalia-offwhite text-center focus:outline-none focus:border-kalia-gold transition-colors"
                          placeholder="Qty"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-4 border-t border-kalia-border/50">
        <button
          type="submit"
          className="flex-1 bg-kalia-gold text-kalia-bg py-3.5 rounded-full font-semibold hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all duration-500"
        >
          {product ? 'Update Product' : 'Add Product'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-kalia-border/50 text-kalia-offwhite py-3.5 rounded-full hover:border-kalia-gold hover:text-kalia-gold transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
