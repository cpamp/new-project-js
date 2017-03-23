import { Process } from './Process';

export class Git extends Process {
    constructor(command: string, params: string[] = []) {
        super('git', [command, ...params]);
    }
}