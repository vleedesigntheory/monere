export const config: any = {
    url: '',
    appID: '',
    userID: '',
    plugins: []
}

export function setConfig(options: any) {
    for(let key in config) {
        if(options[key]) {
            config[key] = options[key];
        }
    }
}