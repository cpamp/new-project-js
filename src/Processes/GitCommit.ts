import { Git } from './Git';

export class GitCommit extends Git {
    constructor(message: string) {
        super('commit', ['-m', /^".*"/.test(message) ? message : '"' + message + '"'])
    }
}