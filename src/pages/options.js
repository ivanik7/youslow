import { get, update } from '../options.js';
import { q, qEach, renderTemplate } from './dom-utils.js';

const hotkeys = [
    {
        name: "Speedup",
        key: "speedup",
    },
    {
        name: "Slowdown",
        key: "slowdown",
    },
    {
        name: "Toggle",
        key: "toggle",
    },
]

let editedKey = null;

function beginKeyEdit(key) {
    stopKeyEdit();

    editedKey = {
        key,
        callback: async (e) => {
            stopKeyEdit();

            await update((options) => {
                options.hotkeys[key] = {
                    code: e.code,
                    altKey: e.altKey,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey
                };
            })

            showHotkeys();
        }
    };

    document.addEventListener('keyup', editedKey.callback);
    q(`.hotkey-keys[data-hotkey="${key}"]`).classList.add('hotkey-keys-editing');
}

function stopKeyEdit() {
    if (editedKey) {
        document.removeEventListener('keyup', editedKey.callback);
        editedKey = null;
    }

    qEach('.hotkey-keys-editing', (e) => {
        e.classList.remove('hotkey-keys-editing');
    })
}

function renderKey(text) {
    return renderTemplate('hotkey-key', {key: text});
}

function renderKeys(key) {
    const keys = [];

    if (key.altKey) {
        keys.push(renderKey('Alt'));
    }
    if (key.ctrlKey) {
        keys.push(renderKey('Ctrl'));
    }
    if (key.shiftKey) {
        keys.push(renderKey('Shift'));
    }

    keys.push(renderKey(key.code.replace(/Key|Digit/, '')));

    return keys.join('');
}

async function showHotkeys() {
    const options = await get();

    q('#hotkey-table-body').innerHTML = hotkeys.map((hotkey) => renderTemplate(
        'hotkey-row',
        {
            name: hotkey.name,
            key: hotkey.key,
            keys: renderKeys(options.hotkeys[hotkey.key])
        }
    )).join('');

    qEach('.hotkey-keys', (e) => {
        e.addEventListener('click', (evt) => {
            beginKeyEdit(e.dataset.hotkey);
        })
    })
}

showHotkeys();
