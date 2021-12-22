# Monere

<p align="center"><a href="" target="_blank"><img src="https://vleedesigntheory.github.io/design/vi/monerevi20211212/monere.png" width="100"></a></p>

## Introduction

Monere (pronounced /mɔ:nei'li:/, like the chinese '莫奈里') is A Web Monitor SDK.

## Start
### cdn

> https://unpkg.com/monere/dist/monere.global.js

### npm

```
$ npm install monere
```

```
import { Monere } from 'monere';

new Monere({
    url: '', // 监控服务器地址
    appID: '',
    userID: '',
    plugins: []
})
```
## Plugins

## Plugins

|Project|Description|
|:-:|:-:|
|[plugin-behavior-pv](https://github.com/vee-monere/monere/tree/main/packages/plugin-behavior-pv)|数据监控，PV埋点|
|[plugin-behavior-click](https://github.com/vee-monere/monere/tree/main/packages/plugin-behavior-click)|数据监控，点击事件埋点|
|[plugin-behavior-duration](https://github.com/vee-monere/monere/tree/main/packages/plugin-behavior-duration)|数据监控，页面停留时长|
|[plugin-behavior-pagechange](https://github.com/vee-monere/monere/tree/main/packages/plugin-behavior-pagechange)|数据监控，页面切换|

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present Victor Lee