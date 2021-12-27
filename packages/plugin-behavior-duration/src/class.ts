import { Plugin } from '@monere/plugin';
import { duration } from './duration'

export class PluginBehaviorDuration {
    constructor() {
        new Plugin('monere-behavior-duration', duration)
    }
}