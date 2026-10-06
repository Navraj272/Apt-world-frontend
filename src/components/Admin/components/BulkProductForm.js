import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getAllSubcategories, getAllProducts } from '@/services/getRequests';
import { bulkCreateProducts } from '@/services/postRequest';
import { useToast } from '@/hooks/use-toast';

const CHUNK_SIZE = 20;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const INITIAL_ROWS = 3;

const inputClass =
  'w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-2.5 py-2 rounded-sm focus:outline-none focus:border-gray-400 transition';

let rowCounter = 0;
const newRow = (categoryId = '', subcategoryId = '') => {
  rowCounter += 1;
  return {
    key: rowCounter,
    categoryId,
    subcategoryId,
    name: '',
    baseCode: '',
    description: '',
    specs: [], // [{ key, value }]
    image: null,
    isActive: true,
    isFavourite: false,
    error: '',
  };
};

const readAsDataUrl = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

const COMMON_SPEC_KEYS = ['Power', 'Voltage', 'Weight', 'Capacity', 'Speed', 'Dimensions', 'Material', 'Warranty'];

const filledSpecs = (specs) => specs.filter((spec) => spec.key.trim() && spec.value.trim());

const specsToObject = (specs) =>
  filledSpecs(specs).reduce((acc, spec) => {
    acc[spec.key.trim()] = spec.value.trim();
    return acc;
  }, {});

/**
 * Popup for editing one product's specifications as Key / Value pairs.
 * Can also copy specs from the row above or apply them to every row.
 */
function SpecsEditor({ rowNumber, initial, previousSpecs, suggestions, onSave, onSaveToAll, onClose }) {
  const [items, setItems] = useState(initial.length > 0 ? initial : [{ key: '', value: '' }]);

  const setItem = (idx, patch) => setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  const removeItem = (idx) => setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== idx) : [{ key: '', value: '' }]));
  const addItem = () => setItems((prev) => [...prev, { key: '', value: '' }]);

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-sm w-full max-w-lg shadow-2xl border border-gray-200 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--apt-navy)]">Specifications &middot; Product {rowNumber}</h4>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-[var(--apt-navy)]" aria-label="Close">&times;</button>
        </div>

        <div className="p-5 space-y-2 overflow-y-auto">
          <datalist id="spec-key-suggestions">
            {suggestions.map((key) => <option key={key} value={key} />)}
          </datalist>
          <div className="grid grid-cols-[1fr_1fr_24px] gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <span>Name (e.g. Power)</span>
            <span>Value (e.g. 2 kW)</span>
            <span />
          </div>
          {items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_1fr_24px] gap-2 items-center">
              <input
                list="spec-key-suggestions"
                value={item.key}
                onChange={(e) => setItem(idx, { key: e.target.value })}
                placeholder="Name"
                className={inputClass}
                autoFocus={idx === 0 && !item.key}
              />
              <input
                value={item.value}
                onChange={(e) => setItem(idx, { value: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && idx === items.length - 1) {
                    e.preventDefault();
                    addItem();
                  }
                }}
                placeholder="Value"
                className={inputClass}
              />
              <button type="button" onClick={() => removeItem(idx)} className="text-gray-400 hover:text-red-500" title="Remove">&times;</button>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            <button type="button" onClick={addItem} className="text-xs font-bold uppercase border border-gray-200 hover:border-[var(--apt-navy)] text-[var(--apt-navy)] px-3 py-1.5 rounded-sm">
              + Add spec
            </button>
            {previousSpecs.length > 0 && (
              <button
                type="button"
                onClick={() => setItems(previousSpecs.map((spec) => ({ ...spec })))}
                className="text-xs font-bold uppercase border border-gray-200 hover:border-[var(--apt-navy)] text-gray-600 px-3 py-1.5 rounded-sm"
              >
                Copy from product above
              </button>
            )}
          </div>
          <p className="text-[11px] text-gray-400 pt-1">Tip: press Enter in the last value to add the next spec. Blank rows are ignored.</p>
        </div>

        <div className="flex flex-wrap justify-end gap-2 px-5 py-3 border-t border-gray-200 bg-gray-50">
          <button type="button" onClick={onClose} className="px-3 py-2 rounded-sm font-bold text-xs uppercase bg-white border border-gray-200 text-gray-600">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSaveToAll(filledSpecs(items))}
            className="px-3 py-2 rounded-sm font-bold text-xs uppercase bg-white border border-gray-300 text-[var(--apt-navy)] hover:border-[var(--apt-navy)]"
            title="Replace the specs of every product in this form with these"
          >
            Apply to all products
          </button>
          <button
            type="button"
            onClick={() => onSave(filledSpecs(items))}
            className="px-4 py-2 rounded-sm font-bold text-xs uppercase bg-[var(--apt-red)] hover:bg-[var(--apt-navy)] text-white transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Type several products into a table and create them in one go.
 * "Same for all" applies one category/subcategory to every row; "Different per product" lets each row choose.
 * Rows that are created are removed from the table, so failed rows can be fixed and submitted again.
 */
export default function BulkProductForm({ categories, onClose, onFinished }) {
  const { toast } = useToast();
  const fileInputs = useRef({});
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [mode, setMode] = useState('same'); // 'same' | 'different'
  const [shared, setShared] = useState({ categoryId: '', subcategoryId: '' });
  const [rows, setRows] = useState(() => Array.from({ length: INITIAL_ROWS }, () => newRow()));
  const [submitting, setSubmitting] = useState(false);
  const [createdTotal, setCreatedTotal] = useState(0);
  const [specsRowKey, setSpecsRowKey] = useState(null);
  const [knownSpecKeys, setKnownSpecKeys] = useState([]);

  useEffect(() => {
    getAllSubcategories({ limit: 1000 })
      .then((res) => setAllSubcategories((res && res.subcategories) || []))
      .catch(() => setAllSubcategories([]));
    // Reuse spec names already used on existing products as suggestions
    getAllProducts({ limit: 100 })
      .then((res) => {
        const keys = new Set();
        ((res && res.products) || []).forEach((p) => Object.keys(p.specs || {}).forEach((k) => keys.add(k)));
        setKnownSpecKeys([...keys]);
      })
      .catch(() => setKnownSpecKeys([]));
  }, []);

  const subsFor = useMemo(() => {
    const byCategory = {};
    allSubcategories.forEach((sub) => {
      (byCategory[sub.categoryId] = byCategory[sub.categoryId] || []).push(sub);
    });
    return (categoryId) => byCategory[categoryId] || [];
  }, [allSubcategories]);

  const updateRow = (key, patch) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch, error: '' } : r)));

  const addRows = (count) =>
    setRows((prev) => [
      ...prev,
      ...Array.from({ length: count }, () =>
        newRow(
          mode === 'different' && prev.length ? prev[prev.length - 1].categoryId : '',
          mode === 'different' && prev.length ? prev[prev.length - 1].subcategoryId : ''
        )
      ),
    ]);

  const removeRow = (key) => setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.key !== key) : prev));

  const changeMode = (next) => {
    if (next === 'different') {
      // Start every row from the shared selection so nothing is lost when switching
      setRows((prev) => prev.map((r) => ({ ...r, categoryId: shared.categoryId, subcategoryId: shared.subcategoryId })));
    }
    setMode(next);
  };

  const handleImage = async (key, file) => {
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) {
      toast({ title: 'Image too large', description: 'Please use images under 5 MB.', variant: 'destructive' });
      return;
    }
    updateRow(key, { image: await readAsDataUrl(file) });
  };

  const categoryOf = (row) => (mode === 'same' ? shared.categoryId : row.categoryId);
  const subcategoryOf = (row) => (mode === 'same' ? shared.subcategoryId : row.subcategoryId);

  const validate = () => {
    if (mode === 'same' && !shared.categoryId) {
      toast({ title: 'Choose a category', description: 'Select the category for all products.', variant: 'destructive' });
      return false;
    }
    const seen = new Set();
    let ok = true;
    setRows((prev) =>
      prev.map((row) => {
        let error = '';
        const code = row.baseCode.trim().toLowerCase();
        if (!row.name.trim()) error = 'Name is required';
        else if (!code) error = 'Base code is required';
        else if (seen.has(code)) error = 'Duplicate base code in this form';
        else if (mode === 'different' && !row.categoryId) error = 'Category is required';
        if (code) seen.add(code);
        if (error) ok = false;
        return { ...row, error };
      })
    );
    return ok;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    let created = 0;
    const failed = new Map(); // row key -> message
    const createdKeys = new Set();

    try {
      for (let start = 0; start < rows.length; start += CHUNK_SIZE) {
        const chunk = rows.slice(start, start + CHUNK_SIZE);
        const items = chunk.map((row) => {
          const specs = specsToObject(row.specs);
          return {
            category: categoryOf(row),
            subcategory: subcategoryOf(row) || undefined,
            name: row.name.trim(),
            baseCode: row.baseCode.trim(),
            description: row.description.trim(),
            specs,
            images: row.image ? [row.image] : [],
            thumbnail: row.image || undefined,
            isActive: row.isActive,
            isFavourite: row.isFavourite,
          };
        });
        // eslint-disable-next-line no-await-in-loop
        const res = await bulkCreateProducts(items);
        const errorByIndex = new Map((res.errors || []).map((er) => [er.row - 1, er.message]));
        chunk.forEach((row, idx) => {
          if (errorByIndex.has(idx)) failed.set(row.key, errorByIndex.get(idx));
          else createdKeys.add(row.key);
        });
        created += res.createdCount || 0;
      }
    } catch {
      toast({
        title: 'Request failed',
        description: 'Some products may not have been created. Check the list and try again.',
        variant: 'destructive',
      });
    }

    setSubmitting(false);
    setCreatedTotal((n) => n + created);
    if (created > 0) onFinished();

    const remaining = rows
      .filter((row) => !createdKeys.has(row.key))
      .map((row) => ({ ...row, error: failed.get(row.key) || '' }));

    if (remaining.length === 0) {
      toast({ title: 'Success', description: `${createdTotal + created} product(s) created.` });
      onClose();
      return;
    }
    setRows(remaining);
    toast({
      title: created > 0 ? 'Partly created' : 'Nothing created',
      description: `${created} created, ${remaining.length} need attention (see the red messages).`,
      variant: created > 0 ? undefined : 'destructive',
    });
  };

  const sharedSubs = subsFor(shared.categoryId);
  const optionLabel = (obj, fallback) => (obj && obj.name && obj.name.en) || fallback;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 bg-black/75 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-sm w-full max-w-7xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--apt-navy)]">Create Multiple Products</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">Fill in one row per product. Name and base code are required.</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-[var(--apt-navy)]" aria-label="Close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Category mode */}
        <div className="px-6 py-4 border-b border-gray-200 space-y-3">
          <div className="inline-flex rounded-sm border border-gray-200 overflow-hidden text-xs font-bold uppercase">
            {[
              ['same', 'Same category for all'],
              ['different', 'Different category per product'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => changeMode(value)}
                className={`px-4 py-2 transition ${mode === value ? 'bg-[var(--apt-navy)] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                {label}
              </button>
            ))}
          </div>

          {mode === 'same' && (
            <div className="flex flex-wrap gap-3">
              <select
                value={shared.categoryId}
                onChange={(e) => setShared({ categoryId: e.target.value, subcategoryId: '' })}
                className={`${inputClass} max-w-xs`}
              >
                <option value="">Select category *</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{optionLabel(cat, `Category #${cat.id}`)}</option>
                ))}
              </select>
              <select
                value={shared.subcategoryId}
                onChange={(e) => setShared((s) => ({ ...s, subcategoryId: e.target.value }))}
                disabled={!shared.categoryId}
                className={`${inputClass} max-w-xs disabled:opacity-50`}
              >
                <option value="">{shared.categoryId ? 'No subcategory' : 'Select a category first'}</option>
                {sharedSubs.map((sub) => (
                  <option key={sub.id} value={sub.id}>{optionLabel(sub, `Subcategory #${sub.id}`)}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Rows */}
        <div className="overflow-auto flex-1 px-6 py-4">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                <th className="pb-2 pr-2 w-8">#</th>
                {mode === 'different' && <th className="pb-2 pr-2 w-44">Category *</th>}
                {mode === 'different' && <th className="pb-2 pr-2 w-44">Subcategory</th>}
                <th className="pb-2 pr-2 w-48">Name *</th>
                <th className="pb-2 pr-2 w-32">Base code *</th>
                <th className="pb-2 pr-2">Description</th>
                <th className="pb-2 pr-2 w-40">Specifications</th>
                <th className="pb-2 pr-2 w-24">Image</th>
                <th className="pb-2 pr-2 w-14 text-center">Active</th>
                <th className="pb-2 pr-2 w-14 text-center">&#9733;</th>
                <th className="pb-2 w-8" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <React.Fragment key={row.key}>
                  <tr className={row.error ? 'bg-red-50/60' : ''}>
                    <td className="py-1.5 pr-2 text-xs text-gray-400 font-semibold">{index + 1}</td>
                    {mode === 'different' && (
                      <td className="py-1.5 pr-2">
                        <select
                          value={row.categoryId}
                          onChange={(e) => updateRow(row.key, { categoryId: e.target.value, subcategoryId: '' })}
                          className={inputClass}
                        >
                          <option value="">Select...</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{optionLabel(cat, `Category #${cat.id}`)}</option>
                          ))}
                        </select>
                      </td>
                    )}
                    {mode === 'different' && (
                      <td className="py-1.5 pr-2">
                        <select
                          value={row.subcategoryId}
                          onChange={(e) => updateRow(row.key, { subcategoryId: e.target.value })}
                          disabled={!row.categoryId}
                          className={`${inputClass} disabled:opacity-50`}
                        >
                          <option value="">None</option>
                          {subsFor(row.categoryId).map((sub) => (
                            <option key={sub.id} value={sub.id}>{optionLabel(sub, `Subcategory #${sub.id}`)}</option>
                          ))}
                        </select>
                      </td>
                    )}
                    <td className="py-1.5 pr-2">
                      <input value={row.name} onChange={(e) => updateRow(row.key, { name: e.target.value })} placeholder="Product name" className={inputClass} />
                    </td>
                    <td className="py-1.5 pr-2">
                      <input value={row.baseCode} onChange={(e) => updateRow(row.key, { baseCode: e.target.value })} placeholder="e.g. ARC-400" className={`${inputClass} font-mono uppercase`} />
                    </td>
                    <td className="py-1.5 pr-2">
                      <input value={row.description} onChange={(e) => updateRow(row.key, { description: e.target.value })} placeholder="Optional" className={inputClass} />
                    </td>
                    <td className="py-1.5 pr-2">
                      <button
                        type="button"
                        onClick={() => setSpecsRowKey(row.key)}
                        className={`w-full text-left text-[11px] font-semibold rounded-sm px-2.5 py-2 border transition ${
                          filledSpecs(row.specs).length > 0
                            ? 'border-[var(--apt-navy)]/30 bg-[var(--apt-navy)]/5 text-[var(--apt-navy)]'
                            : 'border-dashed border-gray-300 text-gray-500 hover:text-[var(--apt-navy)]'
                        }`}
                        title={filledSpecs(row.specs).map((spec) => `${spec.key}: ${spec.value}`).join('\n') || 'Add specifications'}
                      >
                        {filledSpecs(row.specs).length > 0
                          ? `${filledSpecs(row.specs).length} spec${filledSpecs(row.specs).length === 1 ? '' : 's'} \u2713`
                          : '+ Add specs'}
                      </button>
                    </td>
                    <td className="py-1.5 pr-2">
                      <input
                        ref={(el) => { fileInputs.current[row.key] = el; }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleImage(row.key, e.target.files && e.target.files[0]);
                          e.target.value = '';
                        }}
                      />
                      {row.image ? (
                        <div className="flex items-center gap-1.5">
                          <img src={row.image} alt="" className="w-9 h-9 object-cover rounded-sm border border-gray-200" />
                          <button type="button" onClick={() => updateRow(row.key, { image: null })} className="text-[10px] text-gray-400 hover:text-red-500">remove</button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputs.current[row.key] && fileInputs.current[row.key].click()}
                          className="text-[11px] font-semibold text-gray-500 hover:text-[var(--apt-navy)] border border-dashed border-gray-300 rounded-sm px-2 py-1.5"
                        >
                          + Image
                        </button>
                      )}
                    </td>
                    <td className="py-1.5 pr-2 text-center">
                      <input type="checkbox" checked={row.isActive} onChange={(e) => updateRow(row.key, { isActive: e.target.checked })} />
                    </td>
                    <td className="py-1.5 pr-2 text-center">
                      <input type="checkbox" checked={row.isFavourite} onChange={(e) => updateRow(row.key, { isFavourite: e.target.checked })} />
                    </td>
                    <td className="py-1.5 text-right">
                      <button
                        type="button"
                        onClick={() => removeRow(row.key)}
                        disabled={rows.length === 1}
                        title="Remove row"
                        className="text-gray-400 hover:text-red-500 disabled:opacity-30 px-1"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                  {row.error && (
                    <tr>
                      <td />
                      <td colSpan={mode === 'different' ? 10 : 8} className="pb-2 text-[11px] font-semibold text-red-600">{row.error}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => addRows(1)} className="text-xs font-bold uppercase border border-gray-200 hover:border-[var(--apt-navy)] text-[var(--apt-navy)] px-3 py-2 rounded-sm">
              + Add row
            </button>
            <button type="button" onClick={() => addRows(5)} className="text-xs font-bold uppercase border border-gray-200 hover:border-[var(--apt-navy)] text-[var(--apt-navy)] px-3 py-2 rounded-sm">
              + Add 5 rows
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <span className="text-xs text-gray-500">{rows.length} product row(s)</span>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-sm font-bold text-xs uppercase bg-white border border-gray-200 text-gray-600">
              Close
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-5 py-2 rounded-sm font-bold text-xs uppercase bg-[var(--apt-red)] hover:bg-[var(--apt-navy)] text-white disabled:opacity-50 transition"
            >
              {submitting ? 'Creating...' : `Create ${rows.length} product${rows.length === 1 ? '' : 's'}`}
            </button>
          </div>
        </div>
      </div>
      {specsRowKey !== null && (() => {
        const idx = rows.findIndex((r) => r.key === specsRowKey);
        if (idx === -1) return null;
        return (
          <SpecsEditor
            rowNumber={idx + 1}
            initial={rows[idx].specs}
            previousSpecs={idx > 0 ? filledSpecs(rows[idx - 1].specs) : []}
            suggestions={[...new Set([...COMMON_SPEC_KEYS, ...knownSpecKeys, ...rows.flatMap((r) => r.specs.map((sp) => sp.key.trim()).filter(Boolean))])]}
            onSave={(specs) => {
              updateRow(specsRowKey, { specs });
              setSpecsRowKey(null);
            }}
            onSaveToAll={(specs) => {
              setRows((prev) => prev.map((r) => ({ ...r, specs: specs.map((sp) => ({ ...sp })), error: '' })));
              setSpecsRowKey(null);
            }}
            onClose={() => setSpecsRowKey(null)}
          />
        );
      })()}
    </div>
  );
}
