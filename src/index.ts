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
import { NpmList } from './Processes/NpmList';

import * as Nca from 'node-cli-args';

var repository: string = '';
var typescript: boolean = false;
var typescriptInstalled: boolean = false;
var typescriptUpdate: boolean = false;

var args = new Nca.ArgumentManager();
args.on(new Nca.Argument('repository'), (repo) => {
    repository = repo;
});

args.on(new Nca.Argument('typescript', 't'), () => {
    typescript = true;
});

args.on(new Nca.Argument('ts-update', 'u'), () => {
    typescriptUpdate = true;
});

new Promise((resolve) => {resolve();}).then(() => {
    if (repository === '') {
        return Input.request('Enter a git repository: ').then((repo: string) => {
            repository = repo;
        });
    }
}).then(() => {
    if (!typescript && !typescriptUpdate) {
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
    var npmList = new NpmList();
    var p = npmList.start()
    npmList.$process.stdout.on('data', (data) => {
        if (data.toString().indexOf('typescript') !== -1) {
            typescriptInstalled = true;
        }
    });
    return p;
}).then(() => {
    var nodeType = new NpmInstall('@types/node', false, true);
    if ((typescript && !typescriptInstalled) || typescriptUpdate) {
        return new NpmInstall('typescript', true, true).start().then(() => {
            return nodeType.start();
        });
    } else if (typescript) {
        console.log(color.fg.red('Typescript detected, use --ts-update to install latest globally'));
        return nodeType.start();
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