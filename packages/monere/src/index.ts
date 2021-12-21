import { Core } from "@monere/core";
import { Plugin } from "@monere/plugin";

import { pv } from "@monere/plugin-behavior-pv";

export class Monere {
  constructor(options: IOptions) {
    const defaultPlugins = [
        new Plugin("monere-behavior-pv", pv)
    ];
    options.plugins.concat(defaultPlugins);
    new Core(options)
  }
}