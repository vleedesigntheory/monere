"use strict";
exports.__esModule = true;
exports.getUUID = exports.generateUUID = void 0;
function generateUUID() {
    return "monere-".concat(Date.now(), "-").concat(Math.floor(Math.random() * (9e12 - 1)) + 1e12);
}
exports.generateUUID = generateUUID;
var uuid = '';
function getUUID() {
    if (uuid)
        return uuid;
    // 如果是手机 APP，可以调用原生方法或者设备唯一标识当成 uuid
    uuid = localStorage.getItem('uuid');
    if (uuid)
        return uuid;
    uuid = generateUUID();
    localStorage.setItem('uuid', uuid);
    return uuid;
}
exports.getUUID = getUUID;
