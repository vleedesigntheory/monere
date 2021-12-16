"use strict";
exports.__esModule = true;
exports.lazyReportCache = exports.report = exports.reportWithXHR = exports.isSupportSendBeacon = void 0;
var config_1 = require("./config");
var uuid_1 = require("./uuid");
var xhr_1 = require("./xhr");
var cache_1 = require("./cache");
function isSupportSendBeacon() {
    var _a;
    return !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.sendBeacon);
}
exports.isSupportSendBeacon = isSupportSendBeacon;
function reportWithXHR(data) {
    var xhr = new XMLHttpRequest();
    xhr_1.originalOpen.call(xhr, 'post', config_1.config.url, true);
    xhr_1.originalSend.call(xhr, JSON.stringify(data));
}
exports.reportWithXHR = reportWithXHR;
var sendBeacon = isSupportSendBeacon() ? window.navigator.sendBeacon.bind(window.navigator) : reportWithXHR;
var sessionID = (0, uuid_1.generateUUID)();
function report(data, isImmediate) {
    if (isImmediate === void 0) { isImmediate = false; }
    if (!config_1.config.url) {
        console.error('请设置上传 url 地址');
    }
    var reportData = JSON.stringify({
        id: sessionID,
        appID: config_1.config.appID,
        userID: config_1.config.userID,
        data: data
    });
    if (isImmediate) {
        sendBeacon(config_1.config.url, reportData);
        return;
    }
    if (window.requestIdleCallback) {
        window.requestIdleCallback(function () {
            sendBeacon(config_1.config.url, reportData);
        }, { timeout: 3000 });
    }
    else {
        setTimeout(function () {
            sendBeacon(config_1.config.url, reportData);
        });
    }
}
exports.report = report;
var timer = null;
function lazyReportCache(data, timeout) {
    if (timeout === void 0) { timeout = 3000; }
    (0, cache_1.addCache)(data);
    clearTimeout(timer);
    timer = setTimeout(function () {
        var data = (0, cache_1.getCache)();
        if (data.length) {
            report(data);
            (0, cache_1.clearCache)();
        }
    }, timeout);
}
exports.lazyReportCache = lazyReportCache;
