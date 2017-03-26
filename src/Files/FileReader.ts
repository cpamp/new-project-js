import * as fs from 'fs';
import { Promise } from 'es6-promise';

export class FileReader {
    static readFile(file: string): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            fs.readFile(file, (err, data) => {
                if (err) { reject(err); }
                else {
                    resolve(data);
                }
            });
        });
    }
}