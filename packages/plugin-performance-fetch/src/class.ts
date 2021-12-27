import { Plugin } from '@monere/plugin';
import { fetch } from './fetch'

export class PluginPerformanceFetch {
    constructor() {
        new Plugin('monere-performance-fetch',fetch)
    }
}