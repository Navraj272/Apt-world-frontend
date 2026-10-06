// Minimal RFC 4180 CSV parser: quoted fields, escaped quotes, CRLF, BOM
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const source = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (inQuotes) {
      if (char === '"' && source[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && source[i + 1] === '\n') i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

const normalizeHeader = (header) => header.trim().toLowerCase().replace(/[\s_-]+/g, '');

// Returns an array of objects keyed by normalized header (e.g. "Base Code" -> "basecode")
export function csvToObjects(text) {
  const [headerRow, ...dataRows] = parseCsv(text);
  if (!headerRow) return { headers: [], rows: [] };
  const headers = headerRow.map(normalizeHeader);
  const rows = dataRows.map((cells) => {
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = (cells[idx] || '').trim();
    });
    return obj;
  });
  return { headers, rows };
}

const escapeCell = (value) => {
  const str = String(value ?? '');
  return /[",\n\r]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

export function downloadCsv(filename, headers, exampleRows) {
  const lines = [headers, ...exampleRows].map((r) => r.map(escapeCell).join(','));
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// "Power=2kW; Weight=50kg" or a JSON object string -> object
export function parseSpecsCell(value) {
  if (!value) return {};
  const trimmed = value.trim();
  if (trimmed.startsWith('{')) return JSON.parse(trimmed);
  return trimmed.split(';').reduce((acc, pair) => {
    const idx = pair.indexOf('=');
    if (idx > 0) acc[pair.slice(0, idx).trim()] = pair.slice(idx + 1).trim();
    return acc;
  }, {});
}
