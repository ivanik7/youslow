const defaultOptions = {
    hotkeys: {
        speedup: {
            code: "KeyX",
            altKey: false,
            ctrlKey: false,
            shiftKey: false,
        },
        slowdown: {
            code: "KeyZ",
            altKey: false,
            ctrlKey: false,
            shiftKey: false,
        },
        toggle: {
            code: "KeyV",
            altKey: false,
            ctrlKey: false,
            shiftKey: false,
        },
    },
    speed: {
        step: 0.1,
        default: 2,
    }
};

function validate(options) {
    if (!options.hotkeys) {
        return false;
    }

    return true;
}

export async function get() {
    const options = await browser.storage.sync.get();

    if (!validate(options)) {
        return defaultOptions;
    }

    return options;
}

export async function update(cb) {
    const options = await get();
    cb(options);
    await browser.storage.sync.set(options);
}
