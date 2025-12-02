import * as fs from 'fs/promises';
import * as path from 'path';

const TYPE_BUILDING = 80;
const TYPE_MOVING = 30;
const TYPE_PROJECTILE = 60;
const TYPE_EYE_CANDY = 10;
const TYPE_ANIMATED = 20;
const EXCLUDE_TYPES = new Set([TYPE_BUILDING, TYPE_MOVING, TYPE_PROJECTILE, TYPE_EYE_CANDY]);

/**
 * Read `data/units_buildings_techs.de.json`, convert `units_buildings` and `techs`
 * from objects into arrays and write each array to its own file in `data/`.
 *
 * Writes:
 *  - `data/units_buildings.de.json`
 *  - `data/techs.de.json`
 *
 * Returns the absolute paths to the written files.
 */
async function prepareHalfonData(): Promise<{ unitsPath: string; techsPath: string }> {
    const dataDir = path.join(process.cwd(), 'data');
    const srcPath = path.join(dataDir, 'units_buildings_techs.de.json');

    // ensure data dir exists
    await fs.mkdir(dataDir, { recursive: true });

    const raw = await fs.readFile(srcPath, 'utf8');
    const parsed = JSON.parse(raw) as any;

    const unitsObj = parsed?.units_buildings ?? {};
    const techsObj = parsed?.techs ?? {};

    const unitsArr = Array.isArray(unitsObj) ? unitsObj : Object.values(unitsObj);
    const techsArr = Array.isArray(techsObj) ? techsObj : Object.values(techsObj);

    const unitsPath = path.join(dataDir, 'units_buildings.de.json');
    const techsPath = path.join(dataDir, 'techs.de.json');

    await fs.writeFile(unitsPath, JSON.stringify(unitsArr, null, 2), 'utf8');
    await fs.writeFile(techsPath, JSON.stringify(techsArr, null, 2), 'utf8');

    return { unitsPath, techsPath };
}

prepareHalfonData();
