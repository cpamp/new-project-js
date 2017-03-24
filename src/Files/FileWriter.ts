import { Promise } from 'es6-promise';
import * as fs from 'fs';

export class FileWriter {
    static createWrite(fileName: string, data: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static createGitIgnore(): Promise<any> {
        return FileWriter.createWrite('.gitignore', 'node_modules/');
    }
}