import { get, update } from '../options.js';
import { q, qEach, renderTemplate } from './dom-utils.js';

const hotkeys = [
    {
        name: "Speed Up",
        key: "speedup",
    },
    {
        name: "Slow Down",
        key: "slowdown",
    },
    {
        name: "Toggle",
        key: "toggle",
    },
]

function renderKeys(key) {
    const keys = [];

    if (key.altKey) {
        keys.push('Alt');
    }
    if (key.ctrlKey) {
        keys.push('Ctrl');
    }
    if (key.shiftKey) {
        keys.push('Shift');
    }

    keys.push(key.code.replace(/Key|Digit/, ''));

    return keys.join(' + ');
}

export async function showHotkeys() {
    const options = await get();

    q('#hotkey-table-body').innerHTML = hotkeys.map((hotkey) => renderTemplate(
        'hotkey-row',
        {
            name: hotkey.name,
            key: hotkey.key,
            keys: renderKeys(options.hotkeys[hotkey.key])
        }
    )).join('');
}
