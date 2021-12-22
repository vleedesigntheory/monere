import { Core } from "@monere/core";
import { Plugin } from "@monere/plugin";
import { setConfig } from '@moner/shared'
import { pv } from "@monere/plugin-behavior-pv";
import { click } from '@monere/plugin-behavior-click';
import { duration } from '@monere/plugin-behavior-duration';
import { pagechange } from '@monere/plugin-behavior-pagechange'

export function createMonere(options: IOptions) {
  const defaultPlugins = [
    new Plugin("monere-behavior-pv", pv),
    new Plugin("monere-behavior-click", click),
    new Plugin("monere-behavior-duration", duration),
    new Plugin("monere-behavior-pagechange", pagechange),
    new Plugin("monere-behavior-pv", pv)
  ];
  options.plugins.concat(defaultPlugins);
  // 注入config
  setConfig(options);
  return new Core(options);
}

export class Monere {
  constructor(options: IOptions) {
    createMonere(options);
  }
}
