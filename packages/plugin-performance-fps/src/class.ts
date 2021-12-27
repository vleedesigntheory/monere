import { Plugin } from '@monere/plugin';
import { fps } from './fps'

export class PluginPerformanceFPS {
    constructor() {
        new Plugin('monere-performance-fps',fps)
    }
}