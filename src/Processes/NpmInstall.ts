import { Npm } from './Npm';

export class NpmInstall extends Npm {
    constructor(name: string, dev: boolean = false) {
        super('i', ['--save' + (dev ? '-dev' : ''), name])
    }
}