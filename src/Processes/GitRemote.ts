import { Git } from './Git';

export class GitRemote extends Git {
    constructor(repo: string) {
        super('remote', ['add', 'origin', repo]);
    }
}