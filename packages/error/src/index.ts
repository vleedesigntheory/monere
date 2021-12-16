import { isFunction } from '@monere/shared'
export class Error {
    plugins: any[];
    constructor(errorPlugins: []) {
        this.plugins = errorPlugins;
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