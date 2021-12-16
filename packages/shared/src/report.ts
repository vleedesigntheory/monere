import { config } from './config';
import { generateUUID } from './uuid';
import { originalOpen, originalSend } from './xhr';
import { addCache, getCache, clearCache } from './cache';

export function isSupportSendBeacon() {
    return !!window.navigator?.sendBeacon
}

export function reportWithXHR(data: Object) {
    const xhr = new XMLHttpRequest()
    originalOpen.call(xhr, 'post', config.url, true)
    originalSend.call(xhr, JSON.stringify(data))
}

const sendBeacon = isSupportSendBeacon() ? window.navigator.sendBeacon.bind(window.navigator) : reportWithXHR;

const sessionID = generateUUID();

export function report(data: Object, isImmediate = false) {
    if (!config.url) {
        console.error('请设置上传 url 地址')
    }

    const reportData = JSON.stringify({
        id: sessionID,
        appID: config.appID,
        userID: config.userID,
        data,
    })
    
    if (isImmediate) {
        sendBeacon(config.url, reportData)
        return
    }

    if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
            sendBeacon(config.url, reportData)
        }, { timeout: 3000 })
    } else {
        setTimeout(() => {
            sendBeacon(config.url, reportData)
        })
    }
}

let timer:any = null
export function lazyReportCache(data:object, timeout = 3000) {
    addCache(data)

    clearTimeout(timer)
    timer = setTimeout(() => {
        const data = getCache()
        if (data.length) {
            report(data)
            clearCache()
        }
    }, timeout)
}