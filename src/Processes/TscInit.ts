import { Process } from './Process';

export class TscInit extends Process {
    constructor() {
        super(/^win/.test(process.platform) ? 'tsc.cmd' : 'tsc', ['--init']);
    }
}