import { Process } from './Process';

export class Npm extends Process {
    constructor(command: string, params: string[] = []) {
        super(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', [command, ...params]);
    }
}