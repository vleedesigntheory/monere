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