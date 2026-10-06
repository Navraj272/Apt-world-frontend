import React, { useRef, useState } from 'react';
import { csvToObjects, downloadCsv } from '../utils/csv';

const CHUNK_SIZE = 200;

/**
 * Generic CSV bulk-import dialog.
 * - templateHeaders / templateExample: columns of the downloadable sample file
 * - requiredHeaders: normalized (lowercase, no spaces) headers that must exist in the file
 * - mapRow(rowObject): converts one CSV row into the API item (may throw for a bad row)
 * - onImport(items): calls the bulk API for one chunk and returns { createdCount, errors }
 */
export default function BulkImportModal({
  title,
  hint,
  templateFilename,
  templateHeaders,
  templateExample,
  requiredHeaders,
  mapRow,
  onImport,
  onClose,
  onFinished,
}) {
  const fileRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    setResult(null);
    setFileError('');
    setRows([]);
    if (!file) return;
    setFileName(file.name);
    const { headers, rows: parsed } = csvToObjects(await file.text());
    const missing = requiredHeaders.filter((h) => !headers.includes(h));
    if (missing.length > 0) {
      setFileError(`Missing required column(s): ${missing.join(', ')}`);
    } else if (parsed.length === 0) {
      setFileError('The file has no data rows.');
    } else {
      setRows(parsed);
    }
  };

  const handleImport = async () => {
    setImporting(true);
    let createdCount = 0;
    const errors = [];
    try {
      for (let start = 0; start < rows.length; start += CHUNK_SIZE) {
        const slice = rows.slice(start, start + CHUNK_SIZE);
        const items = [];
        const itemRows = [];
        slice.forEach((row, idx) => {
          const rowNumber = start + idx + 1;
          try {
            items.push(mapRow(row));
            itemRows.push(rowNumber);
          } catch (err) {
            errors.push({ row: rowNumber, message: err.message });
          }
        });
        if (items.length > 0) {
          // eslint-disable-next-line no-await-in-loop
          const res = await onImport(items);
          createdCount += res.createdCount || 0;
          (res.errors || []).forEach((er) => errors.push({ row: itemRows[er.row - 1], message: er.message }));
        }
      }
    } catch (error) {
      errors.push({ row: '-', message: (error && error.message) || 'Request failed. Rows already imported were kept; fix and re-upload the rest.' });
    }
    errors.sort((a, b) => (a.row || 0) - (b.row || 0));
    setResult({ createdCount, errors });
    setImporting(false);
    if (createdCount > 0) onFinished();
  };

  const buttonBase = 'px-4 py-2 rounded-sm font-bold text-xs uppercase transition';

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-sm w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--apt-navy)]">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-[var(--apt-navy)]" aria-label="Close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto text-xs text-gray-600">
          <p>{hint}</p>
          <button
            type="button"
            onClick={() => downloadCsv(templateFilename, templateHeaders, templateExample)}
            className={`${buttonBase} bg-gray-50 border border-gray-200 text-gray-600 hover:text-[var(--apt-navy)]`}
          >
            Download CSV template
          </button>

          <div>
            <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={handleFile} className="text-xs" />
            {fileName && !fileError && rows.length > 0 && (
              <p className="mt-2 font-semibold text-[var(--apt-navy)]">{fileName}: {rows.length} row(s) ready to import</p>
            )}
            {fileError && <p className="mt-2 font-semibold text-red-600">{fileError}</p>}
          </div>

          {result && (
            <div className="border border-gray-200 rounded-sm p-4 space-y-2">
              <p className="font-bold text-[var(--apt-navy)]">
                {result.createdCount} created, {result.errors.length} failed
              </p>
              {result.errors.length > 0 && (
                <ul className="max-h-48 overflow-y-auto space-y-1 text-red-600">
                  {result.errors.map((er, idx) => (
                    <li key={idx}>Row {er.row}: {er.message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200">
          <button type="button" onClick={onClose} className={`${buttonBase} bg-gray-50 border border-gray-200 text-gray-600`}>
            {result ? 'Close' : 'Cancel'}
          </button>
          {!result && (
            <button
              type="button"
              disabled={rows.length === 0 || importing}
              onClick={handleImport}
              className={`${buttonBase} bg-[var(--apt-red)] hover:bg-[var(--apt-navy)] text-white disabled:opacity-50`}
            >
              {importing ? 'Importing...' : `Import ${rows.length || ''} rows`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
