import { Promise } from 'es6-promise';
import * as prompt from 'prompt';

prompt.start();

export class Input {
    static request(text: string) {
        return new Promise<string>((resolve, reject) => {
            prompt.get({
                name: 'data',
                description: text,
                type: 'string',
                default: '',
                required: false
            }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.data);
                }
            });
        });
    }

    static end() {
        prompt.stop();
    }
}