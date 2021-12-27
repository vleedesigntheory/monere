import { Plugin } from '@monere/plugin';
import { click } from './click'

export class PluginBehaviorClick {
    constructor() {
        new Plugin('monere-behavior-click',click)
    }
}