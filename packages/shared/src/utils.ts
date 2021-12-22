export function deepCopy(target:any) {
    if (typeof target === 'object') {
        const result:any = Array.isArray(target) ? [] : {}
        for (const key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepCopy(target[key])
            } else {
                result[key] = target[key]
            }
        }

        return result
    }

    return target
}

export function getPageURL() {
    return window.location.href 
}

export function assign( obj1: Object, obj2: Object ) {
    return Object.assign(obj1, obj2)
}

export function extend( to: any, _from: any ) {
    for(const key in _from) {
        to[key] = _from[key]
    }
    return to;
}

export function onBFCacheRestore(callback) {
    window.addEventListener('pageshow', event => {
        if(event.persisted) {
            callback(event)
        }
    }, true)
}

export function onBeforeunload(callback) {
    window.addEventListener('beforeunload', callback, true)
}

export function onHidden(callback, once) {
    const onHiddenOrPageHide = (event) => {
        if(event.type === 'pagehide' || document.visibilityState === 'hidden') {
            callback(event)
            if(once) {
                window.removeEventListener('visibilitychange', onHiddenOrPageHide, true);
                window.removeEventListener('pagehide', onHiddenOrPageHide, true)
            }
        }
    }

    window.addEventListener('visibilitychange', onHiddenOrPageHide, true);
    window.addEventListener('pagehide', onHiddenOrPageHide, true);
}

export function executeAfterLoad(callback) {
    if( document.readyState === 'complete' ) {
        callback()
    } else {
        const onLoad = () => {
            callback();
            window.removeEventListener('load', onLoad, true)
        }

        window.addEventListener('load', onLoad, true)
    }
}