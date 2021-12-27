
import { isSupportPerformanceObserver, onBFCacheRestore, getPageURL, lazyReportCache } from '@monere/shared'

let lcpDone = false;
export function isLCPDone() {
    return lcpDone;
}

export function lcp() {
    if(!isSupportPerformanceObserver()) {
        lcpDone = true;
        return;
    }

    const entryHandler = (list) => {
        lcpDone = true;

        if(observer) {
            observer.disconnect()
        }

        for(const entry of list.getEntries()) {
            const json = entry.toJSON();
            delete json.duration;

            const reportData = {
                ...json,
                target: entry.element?.tagName,
                name: entry.entryType,
                subType: entry.entryType,
                type: 'performance',
                pageURL: getPageURL()
            }

            lazyReportCache(reportData)
        }
    }

    const observer = new PerformanceObserver(entryHandler);
    observer.observe({
        type: 'largest-contentful-paint',
        buffered: true
    });

    onBFCacheRestore(event => {
        requestAnimationFrame(() => {
            lazyReportCache({
                startTime: performance.now() - event.timeStamp,
                name: 'largest-contentful-paint',
                subType: 'largest-contentful-paint',
                type: 'performance',
                pageURL: getPageURL(),
                bfc: true
            })
        })
    })
}