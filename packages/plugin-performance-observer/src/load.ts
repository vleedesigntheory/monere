import { lazyReportCache, onBFCacheRestore, getPageURL } from '@monere/shared'

export function load() {
    ['load', 'DOMContentLoaded'].forEach(type => onEvent(type));

    onBFCacheRestore(event => {
        requestAnimationFrame(() => {
            ['load', 'DOMContentLoaded'].forEach(type => {
                lazyReportCache({
                    startTime: performance.now() - event.timeStamp,
                    subType: type.toLocaleLowerCase(),
                    type: 'performance',
                    pageURL: getPageURL(),
                    bfc: true
                })
            })
        })
    })
}

function onEvent(type) {
    function callback() {
        lazyReportCache({
            type: 'performance',
            subType: type.toLocaleLowerCase(),
            startTime: performance.now()
        })

        window.removeEventListener(type, callback, true)
    }

    window.addEventListener(type, callback, true)
}