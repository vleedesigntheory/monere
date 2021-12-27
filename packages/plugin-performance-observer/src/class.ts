import { Plugin } from '@monere/plugin';
import { cls } from './cls'
import { entries } from './entries'
import { fid } from './fid'
import { fsp } from './fsp'
import { lcp } from './lcp'
import { load } from './load'
import { paint } from './paint'

export class PluginPerformanceCLS {
    constructor() {
        new Plugin('monere-performance-cls',cls)
    }
}

export class PluginPerformanceEntries {
    constructor() {
        new Plugin('monere-performance-entries',entries)
    }
}

export class PluginPerformanceFID {
    constructor() {
        new Plugin('monere-performance-fid',fid)
    }
}

export class PluginPerformanceFSP {
    constructor() {
        new Plugin('monere-performance-fsp',fsp)
    }
}

export class PluginPerformanceLCP {
    constructor() {
        new Plugin('monere-performance-lcp', lcp)
    }
}

export class PluginPerformanceLoad {
    constructor() {
        new Plugin('monere-performance-load', load)
    }
}

export class PluginPerformancePaint {
    constructor() {
        new Plugin('monere-performance-paint',paint)
    }
}