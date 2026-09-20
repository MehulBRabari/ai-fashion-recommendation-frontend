const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function analyzeImage(file) {
  const fd = new FormData();
  fd.append('image', file);
  const res  = await fetch(`${API_BASE}/analyze`, { method: 'POST', body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Server error: ${res.status}`);
  return data;
}

export async function analyzeWebcamFrame(base64Frame) {
  const res  = await fetch(`${API_BASE}/analyze-webcam`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ frame: base64Frame }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Server error: ${res.status}`);
  return data;
}

/**
 * Generate an AI outfit image via Gemini
 * @param {string} analysis_id
 * @param {string} clothing_type  tshirt | shirt | pants | kurta | jacket
 * @param {string} color_name
 * @param {string} color_hex
 * @param {string} skin_tone
 * @param {string} undertone
 */
export async function generateOutfit({ analysis_id, clothing_type, color_name, color_hex, skin_tone, undertone }) {
  const res  = await fetch(`${API_BASE}/generate-outfit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ analysis_id, clothing_type, color_name, color_hex, skin_tone, undertone }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Server error: ${res.status}`);
  return data;
}

export async function checkHealth() {
  try { const r = await fetch(`${API_BASE}/health`); return r.ok; }
  catch { return false; }
}
