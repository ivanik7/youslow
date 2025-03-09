import { get, update } from '../options.js';
import { q, qEach } from './dom-utils.js';
import { showHotkeys as showHotkeysHtml } from './render-keys.js';

let editedKey = null;

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => current[key] = current[key] || {}, obj);
    target[lastKey] = value;
    return obj;
}

async function initializeOptionInputs() {
    const options = await get();
    
    qEach('[data-option-path]', (input) => {
        const path = input.dataset.optionPath;
        const value = getNestedValue(options, path);
        
        if (value !== undefined) {
            input.value = value;
        }

        input.addEventListener('change', async () => {
            let newValue = input.value;
            
            if (input.type === 'number') {
                newValue = parseFloat(newValue);
            } else if (input.type === 'checkbox') {
                newValue = input.checked;
            }

            await update(options => {
                setNestedValue(options, path, newValue);
            });
        });
    });
}

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

document.addEventListener('DOMContentLoaded', () => {
    initializeOptionInputs();
    showHotkeys();
});
