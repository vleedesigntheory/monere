import { Core } from "@monere/core";
import { Plugin } from "@monere/plugin";
import { setConfig } from '@monere/shared'
import { pv } from "@monere/plugin-behavior-pv";
import { click } from '@monere/plugin-behavior-click';
import { duration } from '@monere/plugin-behavior-duration';
import { pagechange } from '@monere/plugin-behavior-pagechange';
import { wrong } from '@monere/plugin-error-wrong';
import { entries, paint, lcp, cls, fid, load, fsp } from '@monere/plugin-performance-observer';
import { fps } from '@monere/plugin-performance-fps';
import { xhr } from '@monere/plugin-performance-xhr';
import { fetch } from '@monere/plugin-performance-fetch';

export function createMonere(options: IOptions) {
  const defaultPlugins = [
    new Plugin("monere-behavior-pv", pv),
    new Plugin("monere-behavior-click", click),
    new Plugin("monere-behavior-duration", duration),
    new Plugin("monere-behavior-pagechange", pagechange),
    new Plugin("monere-behavior-pv", pv),
    new Plugin("monere-error-wrong", wrong),
    new Plugin("monere-performance-entries", entries),
    new Plugin("monere-performance-paint", paint),
    new Plugin("monere-performance-lcp", lcp),
    new Plugin("monere-performance-cls", cls),
    new Plugin("monere-performance-fid", fid),
    new Plugin("monere-performance-xhr", xhr),
    new Plugin("monere-performance-fetch", fetch),
    new Plugin("monere-performance-fps", fps),
    new Plugin("monere-performance-load", load),
    new Plugin("monere-performance-fsp", fsp)
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
