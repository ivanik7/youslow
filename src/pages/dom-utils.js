export function q(selector) {
    return document.querySelector(selector);
}

export function qAll(selector) {
    return document.querySelectorAll(selector);
}

export function qEach(selector, callback) {
    Array.from(qAll(selector)).forEach(callback);
}

export function renderTemplate(name, params) {
    let html = q('#template-' + name).innerHTML;

    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key];
            
            html = html.replaceAll('{{' + key + '}}', value);
        }
    }

    return html.replaceAll('template-class', 'class');
}
