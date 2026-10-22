import { countries } from './data.js';

// removing accents and apostrophes
export function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")                 
    .replace(/[\u0300-\u036f]/g, "")  
    .replace(/[''`´]/g, "")           
    .replace(/[^a-z0-9 ]/g, "");      
}

const SEARCH_INDEX = countries.map((country) => ({
  original: country.name, 
  normalized: normalize(country.name)
}));

export function autocomplete(query, limit = 10) {
  const q = normalize(query.trim());
  if (!q) return [];

  const results = [];

  for (let i = 0; i < SEARCH_INDEX.length; i++) {
    const entry = SEARCH_INDEX[i];
    
  
    if (entry.normalized.indexOf(q) !== -1) {
      results.push(entry.original);
      if (results.length >= limit) break; 
    }
  }
  return results;
}