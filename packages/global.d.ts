declare interface IOptions {
    url: string,
    appID: string,
    userID: string,
    plugins: any[]
}

declare interface IPlugin {
    pluginName: string,
    handler: Function
}