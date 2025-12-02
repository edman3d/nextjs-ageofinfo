import * as fs from 'fs/promises';
import * as path from 'path';

const RAW_URL =
    'https://raw.githubusercontent.com/SiegeEngineers/halfon/master/data/units_buildings_techs.de.json';

/**
 * Download the Halfon `units_buildings_techs.de.json` file into the project's `data` folder.
 *
 * @param dest Optional destination path. Defaults to `<project-root>/data/units_buildings_techs.de.json`.
 * @returns The absolute path to the written file.
 */
async function downloadHalfonUnitsFile(dest?: string): Promise<string> {
    console.log('hello');
    const destPath = dest ?? path.join(process.cwd(), 'data', 'units_buildings_techs.de.json');

    // ensure destination directory exists
    await fs.mkdir(path.dirname(destPath), { recursive: true });

    // Resolve fetch function: prefer global `fetch`, fallback to dynamic `node-fetch` if available
    // use `any` here to avoid TypeScript resolution issues when compiling in different environments
    let fetchFn: any = undefined;
    if (typeof fetch === 'function') {
        fetchFn = fetch;
    } else {
        try {
            // dynamic import to avoid adding a mandatory dependency
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            // @ts-ignore - dynamic import
            const nodeFetch = await import('node-fetch');
            fetchFn = (nodeFetch && (nodeFetch as any).default) || (nodeFetch as any);
        } catch (err) {
            throw new Error('No global fetch available. Run on Node 18+ or install `node-fetch`.');
        }
    }

    const res = await fetchFn!(RAW_URL);
    if (!res.ok) {
        throw new Error(`Failed to download ${RAW_URL}: ${res.status} ${res.statusText}`);
    }

    const body = await res.text();
    await fs.writeFile(destPath, body, 'utf8');
    return destPath;
}

downloadHalfonUnitsFile();

/*
Usage:
    - From Node/ts-node: `await downloadHalfonUnitsFile()`
    - Or import and call from a script to place the file in `data/`.
*/

