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
    url: '',
    appID: '',
    userID: '',
    plugins: []
})
```
## Plugins

|Project|Description|
|:-:|:-:|
|[plugin-behavior-pv](https://github.com/vee-monere/monere/tree/main/packages/plugin-behavior-pv)|数据监控，PV埋点|

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present Victor Lee