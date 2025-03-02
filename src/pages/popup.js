import { q } from './dom-utils.js';
import { showHotkeys } from './render-keys.js';

q('#setting-open').addEventListener('click', () => {
    browser.runtime.openOptionsPage();
});

showHotkeys();
