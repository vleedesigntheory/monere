"use strict";
exports.__esModule = true;
exports.clearCache = exports.addCache = exports.getCache = void 0;
var utils_1 = require("./utils");
var cache = [];
function getCache() {
    return (0, utils_1.deepCopy)(cache);
}
exports.getCache = getCache;
function addCache(data) {
    cache.push(data);
}
exports.addCache = addCache;
function clearCache() {
    cache.length = 0;
}
exports.clearCache = clearCache;
