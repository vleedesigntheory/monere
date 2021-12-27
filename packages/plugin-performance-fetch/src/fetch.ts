import { lazyReportCache } from '@monere/shared'

const originalFetch = window.fetch;

function overwriteFetch() {
    window.fetch = function newFetch(url, config) {
        const startTime = Date.now();

        const reportData = {
            startTime,
            url,
            method: (config?.method || 'GET').toUpperCase(),
            subType: 'fetch',
            type: 'performance'
        }

        return originalFetch(url, config).then(res => {
            (reportData as any).endTime = Date.now();
            (reportData as any).duration = (reportData as any).endTime - (reportData as any).startTime;

            const data = res.clone();
            (reportData as any).status = data.status;
            (reportData as any).success = data.ok;

            lazyReportCache(reportData);

            return res
        }).catch(err => {
            (reportData as any).endTime = Date.now();
            (reportData as any).duration = (reportData as any).endTime - (reportData as any).startTime;
            (reportData as any).status = 0;
            (reportData as any).success = false;

            lazyReportCache(reportData);

            throw err;
        })
    }
}

export function fetch() {
    overwriteFetch()
}