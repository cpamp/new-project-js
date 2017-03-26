
import { Promise } from 'es6-promise';
import * as childProcess from 'child_process';

export const Event = {
    DATA: 'data',
    EXIT: 'exit'
}

export class Process {
    public $process: childProcess.ChildProcess;

    protected $onStart: () => void = () => {};

    constructor(private name: string, private args: string[], private opts: childProcess.SpawnOptions = void 0, private stdPipe: boolean = true) { }

    public start() {
        return new Promise((resolve, reject) => {
            try {
                this.$process = childProcess.spawn(this.name, this.args, this.opts);
                if (this.stdPipe) {
                    process.stdin.pipe(this.$process.stdin);
                    this.$process.stdout.pipe(process.stdout);
                }

                if (typeof this.$onStart === 'function') { this.$onStart(); }

                this.$process.on(Event.EXIT, () => {
                    process.stdin.unpipe();
                    this.$process.stdout.unpipe();
                    process.stdin.removeAllListeners(Event.DATA);
                    this.$process.stdout.removeAllListeners(Event.DATA);
                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    public onInput(fn: (data: Buffer) => void) {
        process.stdin.removeAllListeners(Event.DATA);
        process.stdin.on(Event.DATA, (data: Buffer) => {
            fn.call(this, data);
        });
    }

    public detectEndNextInput(hasStr: string) {
        this.$process.stdout.on(Event.DATA, (data: Buffer) => {
            if (data.toString().indexOf(hasStr) !== -1) {
                process.stdin.on(Event.DATA, () => {
                    this.$process.stdin.end();
                    this.$process.stdout.unpipe();
                    this.$process.kill();
                });
            }
        });
    }

    public detectEnd(hasStr: string) {
        this.$process.stdout.on(Event.DATA, (data: Buffer) => {
            if (data.toString().indexOf(hasStr) !== -1) {
                this.$process.stdin.end();
                this.$process.stdout.unpipe();
                this.$process.kill();
            }
        });
    }

    public onOutput(fn: (data: Buffer) => void) {
        this.$process.stdout.on(Event.DATA, (data: Buffer) => {
            fn.call(this, data);
        });
    }
}