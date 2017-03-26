import { Promise } from 'es6-promise';

export class Input {
    static request(text: string) {
        return new Promise<string>((resolve, reject) => {
            var stdin = process.stdin,
                stdout = process.stdout;
            stdin.resume();
            stdout.write(text);

            stdin.once('data', function (data) {
                resolve(data.toString().trim());
            });
        });
    }
}