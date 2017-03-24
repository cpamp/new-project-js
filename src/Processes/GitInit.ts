import { Git } from './Git';

export class GitInit extends Git {
    constructor() {
        super('init');
    }
}