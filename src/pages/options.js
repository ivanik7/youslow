import { update } from '../options.js';
import { q, qEach } from './dom-utils.js';
import { showHotkeys as showHotkeysHtml } from './render-keys.js';



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

async function showHotkeys() {
    await showHotkeysHtml();

    qEach('.hotkey-keys', (e) => {
        e.addEventListener('click', (evt) => {
            beginKeyEdit(e.dataset.hotkey);
        })
    })
}

showHotkeys();
