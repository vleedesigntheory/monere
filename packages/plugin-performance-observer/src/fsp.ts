import { executeAfterLoad, onBFCacheRestore, getPageURL, lazyReportCache } from '@monere/shared';

import { isLCPDone } from './lcp'

let isOnLoaded = false;

executeAfterLoad(() => {
    isOnLoaded = true
})

let timer;
let observer;

function checkDOMChange() {
    clearTimeout(timer);

    timer = setTimeout(() => {
        if(isOnLoaded && isLCPDone()) {
            observer && observer.disconnect();
            lazyReportCache({
                type: 'performance',
                subType: 'first-screen-paint',
                startTime: getRenderTime(),
                pageURL: getPageURL()
            })
            entries = null
        } else {
            checkDOMChange()
        }
    }, 500);
}

let entries = [];

export function fsp() {
    if(!MutationObserver) return;

    const next = window.requestAnimationFrame ? requestAnimationFrame : setTimeout;

    const ignoreDOMList = ['STYLE','SCRIPT','LINK','META'];

    observer = new MutationObserver(mutationList => {
        checkDOMChange();
        const entry = {
            startTime: 0,
            children: []
        }

        next(() => {
            entry.startTime = performance.now()
        });

        for(const mutation of mutationList) {
            if(mutation.addedNodes.length) {
                for(const node of Array.from(mutation.addedNodes)) {
                    if(node.nodeType === 1 && !ignoreDOMList.includes((node as any).tagName) && !isInclude(node, entry.children)) {
                        entry.children.push(node)
                    }
                }
            }
        }

        if(entry.children.length) {
            entries.push(entry);
        }
    })

    observer.observe(document, {
        childList: true,
        subtree: true
    })

    onBFCacheRestore(event => {
        requestAnimationFrame(() => {
            lazyReportCache({
                startTime: performance.now() - event.timeStamp,
                type: 'performance',
                subType: 'first-screen-paint',
                bfc: true,
                pageURL: getPageURL()
            })
        })
    })
}

function getRenderTime() {
    let startTime = 0;
    entries.forEach(entry => {
        for ( const node of entry.children ) {
            if (isInScreen(node) && entry.startTime > startTime && needToCalculate(node)) {
                startTime = entry.startTime;
                break;
            }
        }
    })

    performance.getEntriesByType('resource').forEach(item => {
        if((item as any).initiatorType === 'img' && (item as any).fetchStart < startTime && (item as any).responseEnd > startTime) {
            startTime = (item as any).responseEnd
        }
    })

    return startTime;
}

function needToCalculate(node) {
    if ( window.getComputedStyle(node).display === 'none') {
        return false;
    }

    if(node.tagName === 'IMG' && node.width < 2 && node.height < 2) {
        return false;
    }

    return true;
}

function isInclude(node, arr) {
    if(!node || node === document.documentElement) {
        return false;
    }

    if(arr.includes(node)) {
        return true;
    }

    return isInclude(node.parentElement, arr)
}

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

function isInScreen(dom) {
    const rectInfo = dom.getBoundingClientRect();

    if(rectInfo.left >= 0 && rectInfo.left < viewportWidth && rectInfo.top >= 0 && rectInfo.top < viewportHeight) {
        return true;
    }
}