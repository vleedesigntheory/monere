"use strict";
exports.__esModule = true;
exports.originalSend = exports.originalOpen = exports.originalProto = void 0;
exports.originalProto = XMLHttpRequest.prototype;
exports.originalOpen = exports.originalProto.open;
exports.originalSend = exports.originalProto.send;
