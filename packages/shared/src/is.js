"use strict";
exports.__esModule = true;
exports.isPlugin = exports.isFunction = exports.isObject = void 0;
function isObject(val) {
    return typeof val === 'object' && val != null;
}
exports.isObject = isObject;
function isFunction(val) {
    return typeof val === 'function';
}
exports.isFunction = isFunction;
function isPlugin(pluginName) {
    var _a = pluginName.split('-'), sdk = _a[0], module = _a[1], name = _a[2];
    if (sdk === 'monere') {
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
    }
    else {
        return false;
    }
}
exports.isPlugin = isPlugin;
