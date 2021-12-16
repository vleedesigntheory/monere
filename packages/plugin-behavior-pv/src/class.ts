import { Plugin } from '@monere/plugin';
import { pv } from './pv'

export class PluginBehaviorPV {
    constructor() {
        new Plugin('monere-behavior-pv',pv)
    }
}