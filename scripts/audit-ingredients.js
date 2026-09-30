const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({window:{}});
for (const [, file] of fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script src="([^"]+)"/g)) {
  if (file === 'app.js') break;
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, {filename:file});
}
const d = context.window.FLAVOR_ATLAS_DATA;
const ids = new Set(d.ingredients.map(i => i.id));
const duplicateIds = d.ingredients.filter((i, n) => d.ingredients.findIndex(x => x.id === i.id) !== n).map(i => i.id);
const invalidLinks = d.cocktails.flatMap(c => c.ingredientRefs.filter(r => r.ingredientIds.some(id => !ids.has(id))).map(r => ({cocktailId:c.id, label:r.label})));
console.log(JSON.stringify({...d.ingredientAudit, duplicateIds, invalidLinks}, null, 2));
if (d.ingredientAudit.unresolved.length || duplicateIds.length || invalidLinks.length) process.exitCode = 1;
