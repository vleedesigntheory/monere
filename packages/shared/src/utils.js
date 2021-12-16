"use strict";
exports.__esModule = true;
exports.extend = exports.assign = exports.getPageURL = exports.deepCopy = void 0;
function deepCopy(target) {
    if (typeof target === 'object') {
        var result = Array.isArray(target) ? [] : {};
        for (var key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepCopy(target[key]);
            }
            else {
                result[key] = target[key];
            }
        }
        return result;
    }
    return target;
}
exports.deepCopy = deepCopy;
function getPageURL() {
    return window.location.href;
}
exports.getPageURL = getPageURL;
function assign(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
exports.assign = assign;
function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to;
}
exports.extend = extend;
