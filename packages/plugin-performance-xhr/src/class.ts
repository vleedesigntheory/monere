import { Plugin } from '@monere/plugin';
import { xhr } from './xhr'

export class PluginBehaviorXHR {
    constructor() {
        new Plugin('monere-performance-xhr',xhr)
    }
}