const fs = require('fs');
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

// 1. Re-add loadStored
if (!code.includes('function loadStored')) {
  const loadStoredCode = `
  // Helper loader from localStorage
  function loadStored<T>(key: string, defaultVal: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultVal;
      const parsed = JSON.parse(item);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        return { ...defaultVal, ...parsed };
      }
      return parsed;
    } catch {
      return defaultVal;
    }
  }

  // Data Collections`;
  code = code.replace('  // Data Collections', loadStoredCode);
}

// 2. Remove migration block
const migrationRegex = /\s+\/\/ One-time guaranteed sync for updates[\s\S]*?localStorage\.setItem\('jj_migration_v7', 'done'\);\s+\}\s+\}, \[\]\);/;
code = code.replace(migrationRegex, '');

fs.writeFileSync('src/context/AppContext.tsx', code);
