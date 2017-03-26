import { Process } from './Process';

export class Npm extends Process {
    constructor(command: string, params: string[] = [], pipe: boolean = true) {
        super(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', [command, ...params], void 0, pipe);
    }
}