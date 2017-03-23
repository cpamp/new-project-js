import { Npm } from './Npm';

export class NpmInstall extends Npm {
    constructor(name: string, dev: boolean = false) {
        super('npm', ['i', '--save' + (dev ? '-dev' : ''), name])
    }
}