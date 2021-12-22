import { Behavior } from '@monere/behavior'
import { Performance } from '@monere/performance'
import { Error as _Error } from '@monere/error'
import { config, isPlugin, isFunction } from '@monere/shared'
export class Core {
  options: IOptions
  behaviorPlugins: any
  performancePlugins: any
  errorPlugins: any
  constructor(options: IOptions) {
    this.options = options;
    this.behaviorPlugins = [];
    this.performancePlugins = [];
    this.errorPlugins = [];
    this.init()
  }
  init() {
    console.log('Monere init')
    new Behavior(this.behaviorPlugins)
    new Performance(this.performancePlugins)
    new _Error(this.errorPlugins)
  }
  plugin(name: String, handler: Function) {
    if (!isPlugin(name)) {
      if (console && console.warn) {
        console.warn(
          name +
            ': 插件名称不符合要求，请查看文档\n' +
            'https://github.com/veeui/monere/blob/main/README.md',
        )
      }
    }
    switch (name) {
      case 'behavior':
        isFunction(handler) && this.behaviorPlugins.push(handler)
        break
      case 'performance':
        isFunction(handler) && this.performancePlugins.push(handler)
        break
      case 'error':
        isFunction(handler) && this.errorPlugins.push(handler)
        break
      default:
        break
    }
  }
}
