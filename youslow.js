(() => {
    let currentSpeed = 2;
    let enabled = false;
    
    let button;
    
    let video;
    function getVideo() {
        if (!video) {
            video = document.querySelector('video');
        }

        return video;
    }

    function applySpeed() {
        const speed = enabled ? currentSpeed : 1;

        if (button) {
            button.innerHTML = `${speed.toFixed(1)}x`;
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

    document.addEventListener('keyup', (e) => {
        if (e.code === "KeyZ") {
            currentSpeed -= 0.1;
            enabled = true;
            applySpeed();
        } else if (e.code === "KeyX") {
            currentSpeed += 0.1;
            enabled = true;
            applySpeed();
        } else if (e.code === "KeyV") {
            enabled = !enabled;
            applySpeed();
        }
    });

    const checkExist = setInterval(function () {
        if (document.querySelector('.ytp-right-controls')) {
            addControls();
            clearInterval(checkExist);
        }
    }, 100);
})();

