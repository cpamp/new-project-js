import { Npm } from './Npm';

export class NpmInstall extends Npm {
    constructor(name: string, global: boolean = false, dev: boolean = false) {
        var args: string[] = [];
        if (dev) {
            args = ['--save-dev'];
        } else {
            args = ['--save']
        }
        if (global) {
            args = ['-g'];
        }
        args = [...args, name]
        super('i', args);
    }
}