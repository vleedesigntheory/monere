export function isObject(val:unknown):val is Record<any, any> {
    return typeof val === 'object' && val != null;
}

export function isFunction(val:unknown):Boolean {
    return typeof val === 'function';
}

export function isPlugin(pluginName: String): Boolean {
    const [sdk, module, name] = pluginName.split('-');
    if(sdk === 'monere') {
        switch (module) {
            case 'behavior':
                return name != undefined || name != 'null';
            case 'performance':
                return name != undefined || name != 'null';
            case 'error':
                return name != undefined || name != 'null';
            default:
                return false;
        }
    } else {
        return false;
    }
}