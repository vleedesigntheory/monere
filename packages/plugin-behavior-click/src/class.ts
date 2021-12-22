import { Plugin } from '@monere/plugin';
import { click } from './click'

export class PluginBehaviorPV {
    constructor() {
        new Plugin('monere-behavior-click',click)
    }
}