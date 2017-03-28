import { Npm } from './Npm';

export class NpmList extends Npm {
    constructor() {
        super('list', ['-g'], false);
    }
}