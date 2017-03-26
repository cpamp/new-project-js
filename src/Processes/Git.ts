import { Process } from './Process';

export class Git extends Process {
    constructor(command: string, params: string[] = [], pipe: boolean = true) {
        super('git', [command, ...params], void 0, pipe);
    }
}