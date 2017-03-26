#!/usr/bin/env node

import { Promise } from 'es6-promise';
import { Input } from './Input/Input';
import * as color from 'colorful-text';
import { GitInit } from './Processes/GitInit';
import { GitRemote } from './Processes/GitRemote';
import { NpmInit } from './Processes/NpmInit';
import { NpmInstall } from './Processes/NpmInstall';
import { TscInit } from './Processes/TscInit';
import { FileWriter } from './Files/FileWriter';
import { GitAdd } from './Processes/GitAdd';
import { GitCommit } from './Processes/GitCommit';
import { FileReader } from './Files/FileReader';

import * as Nca from 'node-cli-args';

var repository: string = '';
var typescript: boolean = false;

var args = new Nca.ArgumentManager();
args.on(new Nca.Argument('repository'), (repo) => {
    repository = repo;
});

args.on(new Nca.Argument('typescript', 't'), () => {
    typescript = true;
})

new Promise((resolve) => {resolve();}).then(() => {
    if (repository === '') {
        return Input.request('Enter a git repository: ').then((repo: string) => {
            repository = repo;
        });
    }
}).then(() => {
    if (!typescript) {
        return Input.request('Is this a Typescript project? (yes): ').then((ts: string) => {
            typescript = /^.*[Yy].*$/.test(ts) || /^ *$/.test(ts);
        });
    }
}).then(() => {
    return new GitInit().start();
}).then(() => {
    if (!/^ *$/.test(repository)) {
        return new GitRemote(repository).start();
    }
}).then(() => {
    return new NpmInit().start();
}).then(() => {
    if (typescript) {
        return new NpmInstall('typescript').start().then(() => {
            return new NpmInstall('@types/node', true).start();
        });
    }
}).then(() => {
    return new TscInit().start();
}).then(() => {
    return FileWriter.createGitIgnore();
}).then(() => {
    return FileReader.readFile('package.json').then((pkg: Buffer) => {
        return JSON.parse(pkg.toString());
    }).then((pkgObj) => {
        var name = pkgObj.name;
        return FileWriter.createWrite('README.md', '# ' + name);
    });
}).then(() => {
    return new GitAdd().start();
}).then(() => {
    return new GitCommit('Initial Commit').start();
}).catch((err) => {
    console.log(color.fg.red('There was an error: '));
    console.log(err);
}).then(() => {
    return Input.request('Press any key to continue...');
}).then(() => {
    process.exit();
});