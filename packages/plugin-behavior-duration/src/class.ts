import { Plugin } from '@monere/plugin';
import { duration } from './duration'

export class PluginBehaviorPV {
    constructor() {
        new Plugin('monere-behavior-duration', duration)
    }
}