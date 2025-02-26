import { q } from './dom-utils.js';

q('#setting-open').addEventListener('click', () => {
    browser.runtime.openOptionsPage();
});
