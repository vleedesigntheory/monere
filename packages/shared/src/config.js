"use strict";
exports.__esModule = true;
exports.setConfig = exports.config = void 0;
exports.config = {
    url: '',
    appID: '',
    userID: '',
    plugins: []
};
function setConfig(options) {
    for (var key in exports.config) {
        if (options[key]) {
            exports.config[key] = options[key];
        }
    }
}
exports.setConfig = setConfig;
