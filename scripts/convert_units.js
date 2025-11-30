const fs = require('fs');
const path = require('path');

const inPath = 'c:\\Users\\ejsma\\Downloads\\units_buildings.de.json';
const outDir = path.resolve(__dirname, '..', 'data');
const outPath = path.join(outDir, 'units_buildings.de.array.json');

if (!fs.existsSync(inPath)) {
    console.error('Input file not found:', inPath);
    process.exit(2);
}

const raw = fs.readFileSync(inPath, 'utf8');
let parsed;
try {
    parsed = JSON.parse(raw);
} catch (err) {
    console.error('Failed to parse JSON:', err.message);
    process.exit(3);
}

const unitsObj = parsed.units_buildings || parsed.units || parsed;
if (typeof unitsObj !== 'object' || Array.isArray(unitsObj)) {
    console.error('Expected an object with units; found:', typeof unitsObj);
    process.exit(4);
}

const keys = Object.keys(unitsObj).sort((a, b) => Number(a) - Number(b));
const arr = keys.map(k => unitsObj[k]);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(arr, null, 2), 'utf8');
console.log('Wrote', outPath, 'with', arr.length, 'entries');
