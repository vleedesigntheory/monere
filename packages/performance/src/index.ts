import { isFunction } from '@monere/shared'
export class Performance {
    plugins: any[];
    constructor(performancePlugins: []) {
        this.plugins = performancePlugins;
        this.run();
    }
    run() {
        this.plugins.length > 0 && this.plugins.forEach(plugin => {
            if(isFunction(plugin)) {
                plugin()
            }
        })
    }
}