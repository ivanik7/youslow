(async () => {
    const {get} = await import(browser.runtime.getURL('src/options.js'));

    const options = await get();
    
    let currentSpeed = options.speed.default;
    let enabled = false;
    
    let video;
    function getVideo() {
        if (!video) {
            video = document.querySelector('video');
        }

        return video;
    }

    let button;
    function applySpeed() {
        const speed = enabled ? currentSpeed : 1;

        if (button) {
            button.textContent = `${speed.toFixed(1)}x`;
        }

        const video = getVideo();
        if (video) {
            video.playbackRate = speed;
        }
    }

    function addControls() {
        const rightControlsElement = document.querySelector(".ytp-right-controls");

        button = document.createElement("button");
        
        button.classList.add("ytp-button");
        button.classList.add("ytp-time-display");
        button.style.textAlign = "right";

        applySpeed();

        button.addEventListener("click", () => {
            enabled = !enabled;
            applySpeed();
        });
        
        rightControlsElement.prepend(button);
    };

    function hotkey(e) {
        for (const hotkeyName in options.hotkeys) {
            if (Object.prototype.hasOwnProperty.call(options.hotkeys, hotkeyName)) {
                const hotkey = options.hotkeys[hotkeyName];
                
                if (
                    e.code === hotkey.code &&
                    e.altKey === hotkey.altKey &&
                    e.ctrlKey === hotkey.ctrlKey &&
                    e.shiftKey === hotkey.shiftKey
                ) {
                    return hotkeyName;
                } 
            }
        }
    }

    document.addEventListener('keyup', (e) => {
        switch (hotkey(e)) {
            case 'slowdown':
                currentSpeed = Math.max(0.1, currentSpeed - options.speed.step);
                enabled = true;
                applySpeed();
                break;
            case 'speedup':
                currentSpeed = Math.min(16, currentSpeed + options.speed.step);
                enabled = true;
                applySpeed();
                break;
            case 'toggle':
                enabled = !enabled;
                applySpeed();
                break;
        }
    });

    const checkExist = setInterval(function () {
        if (document.querySelector('.ytp-right-controls')) {
            addControls();
            clearInterval(checkExist);
        }
    }, 100);
})();
