import { isSupportPerformanceObserver, onBFCacheRestore, getPageURL, lazyReportCache } from '@monere/shared'

export function fid() {
    onBFCacheRestore(() => {
        fid()
    });

    if(!isSupportPerformanceObserver()) {
        const entryHandler = (list) => {
            if(observer) {
                observer.disconnect()
            }

            for(const entry of list.getEntries()) {
                const json = entry.toJSON();
                json.nodeName = entry.tagName;
                json.event = json.name;
                json.name = json.entryType;
                json.type = 'performance';
                json.pageURL = getPageURL();
                delete json.cancelable;

                lazyReportCache(json)
            }
        }

        const observer = new PerformanceObserver(entryHandler);
        observer.observe({
            type: 'first-input',
            buffered: true
        })

        return
    }

    fidPolyfill();


}

function fidPolyfill() {
    eachEventType(window.addEventListener)
}

function onInput(event) {
    if(event.cancelable) {
        const isEpochTime = event.timeStamp > 1e12;
        const now = isEpochTime ? Date.now() : performance.now();

        const duration = now - event.timeStamp;

        lazyReportCache({
            duration,
            subType: 'first-input',
            event: event.type,
            name: 'first-input',
            target: event.target.tagName,
            startTime: event.timeStamp,
            type: 'performance',
            pageURL: getPageURL()
        })

        eachEventType(window.removeEventListener)
    }
}

function eachEventType(callback) {
    const eventTypes = [
        'mousedown',
        'keydown',
        'touchstart'
    ];

    eventTypes.forEach((type) => {
        callback(type,onInput, {passive: true, capture: true})
    });
}