import { getPageURL, getUUID, onBeforeunload, report } from '@monere/shared'

export function duration() {
    onBeforeunload(() => {
        report({
            type: 'behavior',
            subType: 'page-access-duration',
            startTime: performance.now(),
            pageURL: getPageURL(),
            uuid: getUUID()
        })
    })
}