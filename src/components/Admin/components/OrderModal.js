import React, { useState, useEffect, useCallback } from 'react';
import { getAllCategories, getAllSubcategories, getAllProducts } from '@/services/getRequests';
import { reorderCategories, reorderSubcategories, reorderProducts } from '@/services/putReguest';
import { useToast } from '@/hooks/use-toast';

const nameOf = (item) => item?.name?.en || item?.name?.EN || item?.slug || `#${item?.id}`;

const MODES = {
  categories: { title: 'Order categories', save: reorderCategories },
  subcategories: { title: 'Order subcategories', save: reorderSubcategories },
  products: { title: 'Order products', save: reorderProducts },
};

const selectClass =
  'bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition';

// Drag rows (or use the arrows) to set the order shown on the website. Top of the list is shown first.
export default function OrderModal({ mode, isOpen, onClose, onSaved, initialCategoryId = '', initialSubcategoryId = '' }) {
  const { toast } = useToast();
  const config = MODES[mode];
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [dirty, setDirty] = useState(false);

  const needsCategory = mode !== 'categories';
  const needsSubcategory = mode === 'products';

  useEffect(() => {
    if (!isOpen) return;
    setDirty(false);
    getAllCategories({ limit: 500 })
      .then((res) => {
        const list = res?.categories || [];
        setCategories(list);
        if (mode === 'categories') setItems(list);
        else setCategoryId(initialCategoryId ? String(initialCategoryId) : (list[0] ? String(list[0].id) : ''));
      })
      .catch(() => {});
  }, [isOpen, mode]);

  useEffect(() => {
    if (!isOpen || !needsSubcategory || !categoryId) return;
    getAllSubcategories({ categoryId, limit: 500 })
      .then((res) => {
        const list = res?.subcategories || [];
        setSubcategories(list);
        // '' = every subcategory of the category
        const keep = initialSubcategoryId && list.some((s) => String(s.id) === String(initialSubcategoryId));
        setSubcategoryId(keep ? String(initialSubcategoryId) : '');
      })
      .catch(() => {});
  }, [isOpen, needsSubcategory, categoryId]);

  const loadScope = useCallback(async () => {
    setDirty(false);
    if (mode === 'categories') return;
    setLoading(true);
    try {
      if (mode === 'subcategories') {
        if (!categoryId) return setItems([]);
        const res = await getAllSubcategories({ categoryId, limit: 500 });
        setItems(res?.subcategories || []);
      } else {
        if (!categoryId) return setItems([]);
        const res = await getAllProducts(subcategoryId ? { subcategoryId, limit: 500 } : { categoryId, limit: 500 });
        setItems(res?.products || []);
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [mode, categoryId, subcategoryId]);

  useEffect(() => {
    if (isOpen) loadScope();
  }, [isOpen, loadScope]);

  if (!isOpen) return null;

  const move = (from, to) => {
    if (to < 0 || to >= items.length || from === to) return;
    setItems((prev) => {
      const next = [...prev];
      const [row] = next.splice(from, 1);
      next.splice(to, 0, row);
      return next;
    });
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await config.save(items.map((i) => i.id));
      toast({ title: 'Order saved', description: 'The website will now follow this order.' });
      setDirty(false);
      if (onSaved) onSaved();
      onClose();
    } catch {
      toast({ title: 'Error', description: 'Failed to save the order.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-white w-full max-w-lg max-h-[85vh] flex flex-col rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-base font-bold text-[var(--apt-navy)]">{config.title}</h3>
          <p className="text-xs text-gray-500 mt-1">Drag rows or use the arrows. The top item is shown first on the website.{mode === 'products' ? ' Pick a subcategory, or leave it on All subcategories to order the whole category.' : ''}</p>
        </div>

        {(needsCategory || needsSubcategory) && (
          <div className="px-5 pt-4 flex flex-wrap gap-3">
            {needsCategory && (
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={selectClass}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{nameOf(c)}</option>
                ))}
              </select>
            )}
            {needsSubcategory && (
              <select value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} className={selectClass}>
                <option value="">All subcategories</option>
                {subcategories.map((s) => (
                  <option key={s.id} value={s.id}>{nameOf(s)}</option>
                ))}
              </select>
            )}
          </div>
        )}

        <ul className="flex-1 overflow-y-auto p-5 space-y-2">
          {loading && <li className="text-xs text-gray-400">Loading...</li>}
          {!loading && items.length === 0 && <li className="text-xs text-gray-400">Nothing to order here.</li>}
          {!loading && items.map((item, index) => (
            <li
              key={item.id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { move(dragIndex, index); setDragIndex(null); }}
              onDragEnd={() => setDragIndex(null)}
              className={`flex items-center gap-3 bg-gray-50 border px-3 py-2.5 rounded-sm cursor-grab active:cursor-grabbing ${
                dragIndex === index ? 'border-[var(--apt-red)] opacity-60' : 'border-gray-200'
              }`}
            >
              <span className="text-gray-300 select-none" aria-hidden="true">⋮⋮</span>
              <span className="w-6 text-xs font-bold text-gray-400">{index + 1}</span>
              <span className="flex-1 text-xs font-semibold text-gray-800 truncate">
                {nameOf(item)}{item.baseCode ? ` · ${item.baseCode}` : ''}
              </span>
              <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} aria-label="Move up" className="px-1.5 text-gray-500 hover:text-[var(--apt-red)] disabled:opacity-30">▲</button>
              <button type="button" onClick={() => move(index, index + 1)} disabled={index === items.length - 1} aria-label="Move down" className="px-1.5 text-gray-500 hover:text-[var(--apt-red)] disabled:opacity-30">▼</button>
            </li>
          ))}
        </ul>

        <div className="px-5 py-4 border-t border-gray-200 flex justify-end gap-2">
          <button onClick={onClose} className="text-xs font-bold uppercase px-4 py-2.5 border border-gray-200 rounded-sm hover:border-[var(--apt-navy)]">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!dirty || saving}
            className="text-xs font-bold uppercase px-4 py-2.5 rounded-sm bg-[var(--apt-red)] text-white hover:bg-[var(--apt-navy)] disabled:opacity-40"
          >
            {saving ? 'Saving...' : 'Save order'}
          </button>
        </div>
      </div>
    </div>
  );
}
