export class Plugin {
    pluginName: String;
    handler: Function;
    constructor(pluginName:string, handler:Function) {
        this.pluginName = pluginName;
        this.handler = handler;
        this.run()
    }
    run() {
        this.handler()
    }
}