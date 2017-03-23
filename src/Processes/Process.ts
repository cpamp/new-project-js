
import { Promise } from 'es6-promise';
import * as childProcess from 'child_process';

export class Process {
    public $process: childProcess.ChildProcess;

    constructor(private name: string, private args: string[], private opts: childProcess.SpawnOptions) { }

    public start() {
        return new Promise((resolve, reject) => {
            try {
                this.$process = childProcess.spawn(this.name, this.args, this.opts);
                process.stdin.pipe(this.$process.stdin);
                this.$process.stdout.pipe(process.stdout);

                this.$process.on('exit', () => {
                    process.stdin.unpipe();
                    this.$process.stdout.unpipe();
                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    public onInput(fn: (data: Buffer) => void) {
        process.stdin.on('data', (data: Buffer) => {
            fn.call(this, data);
        });
    }

    public onOutput(fn: (data: Buffer) => void) {
        this.$process.stdout.on('data', (data: Buffer) => {
            fn.call(this, data);
        });
    }
}