import { Process } from './Process';

export class NpmInit extends Process {
    constructor() {
        super('npm', ['init']);
    }
}