import { lazyReportCache, getPageURL, getUUID } from '@monere/shared'

export function click() {
    ['mousedown', 'touchstart'].forEach(eventType => {
        let timer:any = null;
        window.addEventListener(eventType, event => {
            clearTimeout(timer as any);
            timer = setTimeout(() => {
                const target = event.target;
                const { top, left } = (target as any).getBoundingClientRect() as DOMRect;

                lazyReportCache({
                    top,
                    left,
                    eventType,
                    pageHeight: document.documentElement.scrollHeight || document.body.scrollHeight,
                    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
                    type: 'behavior',
                    subType: 'click',
                    target: (target as any).tagName,
                    paths: (event as any).path?.map(item => item.tagName).filter(Boolean),
                    startTime: event.timeStamp,
                    pageUrl: getPageURL(),
                    outerHTML: (target as any).outerHTML,
                    innerHTML: (target as any).innerHTML,
                    width: (target as any).offsetWidth,
                    height: (target as any).offsetHeight,
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    },
                    uuid: getUUID()
                })
            }, 500);
        })
    })
}