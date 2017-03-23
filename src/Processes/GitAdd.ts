import { Git } from './Git';

export class GitAdd extends Git {
    constructor() {
        super('add', ['.'])
    }
}