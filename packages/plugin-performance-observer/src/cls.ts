import { isSupportPerformanceObserver, onBFCacheRestore, deepCopy, getPageURL, onHidden, lazyReportCache } from '@monere/shared'

export function cls() {
    if(!isSupportPerformanceObserver) return;

    onBFCacheRestore(() => {
        cls()
    })

    let sessionValue = 0;
    let sessionEntries = [];
    const _cls = {
        subType: 'layout-shift',
        name: 'layout-shift',
        type: 'performance',
        pageURL: getPageURL(),
        value: 0
    }

    const entryHandler = (list) => {
        for(const entry of list.getEntries()) {
            if(!entry.hadRecentInput) {
                const firstSessionEntry = sessionEntries[0];
                const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

                if(sessionValue && entry.startTime - lastSessionEntry.startTime < 1000 && entry.startTime - lastSessionEntry.startTime < 5000) {
                    sessionValue += entry.value;
                    sessionEntries.push(formatCLSEntry(entry));
                } else {
                    sessionValue = entry.value;
                    sessionEntries = [formatCLSEntry(entry)]
                }

                if(sessionValue > _cls.value) {
                    _cls.value = sessionValue;
                    (_cls as any).entries = sessionEntries;
                    (_cls as any).startTime = performance.now();
                    lazyReportCache(deepCopy(_cls))
                }
            }
        }
    }

    const observer = new PerformanceObserver(entryHandler);
    observer.observe({
        type: 'layout-shift',
        buffered: true
    })

    if(observer) {
        onHidden(() => {
            observer.takeRecords().map(entryHandler)
        }, true)
    }

}

function formatCLSEntry(entry) {
    const result = entry.toJSON();
    delete result.duration;
    delete result.sources;

    return result;
}