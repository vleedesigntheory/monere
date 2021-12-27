import { Plugin } from '@monere/plugin';
import { wrong } from './wrong'

export class PluginErrorWrong {
    constructor() {
        new Plugin('monere-error-wrong',wrong)
    }
}