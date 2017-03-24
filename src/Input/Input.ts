import { Promise } from 'es6-promise';
import * as prompt from 'prompt';

export class Input {
    static request(text: string) {
        return new Promise<string>((resolve, reject) => {
            process.stdout.write(text);
            prompt.get(['data'], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.data);
                }
            });
        });
    }
}