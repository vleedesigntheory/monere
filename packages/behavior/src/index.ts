import { isFunction } from '@monere/shared'
export class Behavior {
    plugins: any[];
    constructor(behaviorPlugins: []) {
        this.plugins = behaviorPlugins;
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