import { Plugin } from '@monere/plugin';
import { pagechange } from './pagechange'

export class PluginBehaviorPV {
    constructor() {
        new Plugin('monere-behavior-pagechange', pagechange)
    }
}