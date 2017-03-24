import { Process } from './Process';

export class TscInit extends Process {
    constructor() {
        super('tsc', ['--init']);
    }
}