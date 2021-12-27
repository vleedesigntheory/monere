import { report, deepCopy } from '@monere/shared'

const next = window.requestAnimationFrame ? requestAnimationFrame : (callback) => {
    setTimeout(callback, 1000 / 60);
};

const frames = [];

export function fps() {
    let frame = 0;
    let lastSecond = Date.now();

    function calculateFPS() {
        frame++;
        const now = Date.now();

        if(lastSecond + 1000 <= now) {
            const fps = Math.round((frame*1000) / (now - lastSecond));
            frames.push(fps);

            frame = 0;
            lastSecond = now;
        }

        if(frames.length >= 60) {
            report({
                frames,
                type: 'performance',
                subType: 'fps'
            })

            frames.length = 0;
        }

        next(calculateFPS)
    }

    calculateFPS()
}

export function isBlocking(fpsList, below = 20, last = 3) {
    let count = 0;
    for( let i = 0; i < fpsList.length; i++ ) {
        if(fpsList[i] && fpsList[i] < below) {
            count++;
        } else {
            count = 0;
        }

        if(count >= last) {
            return true;
        }
    }

    return false;
}