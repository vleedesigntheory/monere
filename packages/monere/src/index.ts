import { Monere } from "@monere/core";
import { Plugin } from '@monere/plugin';

import { pv } from '@monere/plugin-behavior-pv'

export function createMonere(options:IOptions) {
    const defaultPlugins = [
        new Plugin('monere-behavior-pv', pv)
    ];
    options.plugins.concat(defaultPlugins);
    return new Monere(options);
}