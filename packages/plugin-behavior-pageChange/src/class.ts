import { Plugin } from '@monere/plugin';
import { pagechange } from './pagechange'

export class PluginBehaviorPageChange {
    constructor() {
        new Plugin('monere-behavior-pagechange', pagechange)
    }
}