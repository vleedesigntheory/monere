import { lazyReportCache, onBFCacheRestore, getPageURL } from '@monere/shared'

export function wrong() {
    const oldConsoleError = window.console.error;

    window.console.error = (...args) => {
        oldConsoleError.apply(this, args);
        lazyReportCache({
            type: 'error',
            subType: 'console-error',
            startTime: performance.now(),
            errData: args,
            pageURL: getPageURL()
        })
    }

    window.addEventListener('error', e => {
        const target = e.target;
        if(!target) return;

        if((target as any).src || (target as any).href) {
            const url = (target as any).src || (target as any).href;
            lazyReportCache({
                url,
                type: 'error',
                subType: 'resource',
                startTime: e.timeStamp,
                html: (target as any).outerHTML,
                resourceType: (target as any).tagName,
                paths: (e as any).path.map(item => item.tagName).filter(Boolean),
                pageURL: getPageURL()
            })
        }
    }, true);

    window.onerror = ( msg, url, line, column, error ) => {
        lazyReportCache({
            msg,
            line,
            column,
            error: error.stack,
            subType: 'js',
            pageURL: url,
            type: 'error',
            startTime: performance.now()
        })
    };

    window.addEventListener('unhandledrejection', e => {
        lazyReportCache({
            reason: e.reason?.stack,
            subType: 'promise',
            type: 'error',
            startTime: e.timeStamp,
            pageURL: getPageURL()
        })
    });

    onBFCacheRestore(() => {
        wrong()
    })
}