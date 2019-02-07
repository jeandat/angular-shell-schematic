import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const name = 'foo';
const title = 'FOO';
const prefix = 'ap'; // a prefix

const collectionPath = path.join(__dirname, '../collection.json');
const runner = new SchematicTestRunner('angular-shell-schematic', collectionPath);

describe('angular-shell-schematic', () => {

    let projectTree:Tree;

    beforeEach(() => {
        projectTree = Tree.empty();
    });

    it('should generate tree', () => {
        const tree = runner.runSchematic('ng-new', {name, title}, projectTree);
        expect(tree.exists(`${name}/angular.json`)).toBe(true);
    });

    it('should insert title in README', () => {
        const tree = runner.runSchematic('ng-new', {name, title}, projectTree);
        const readmeFile = tree.read(`${name}/README.md`);
        expect(readmeFile).not.toBeNull();
        // @ts-ignore
        expect(readmeFile.toString('utf8')).toMatch(title);
    });

    it('should insert name in package.json', () => {
        const tree = runner.runSchematic('ng-new', {name, title}, projectTree);
        const packageFile = tree.read(`${name}/package.json`);
        expect(packageFile).not.toBeNull();
        // @ts-ignore
        expect(packageFile.toString('utf8')).toMatch(name);
    });

    it('should insert prefix in angular.json', () => {
        const tree = runner.runSchematic('ng-new', {name, title, prefix}, projectTree);
        const cliConf = tree.read(`${name}/angular.json`);
        expect(cliConf).not.toBeNull();
        // @ts-ignore
        expect(cliConf.toString('utf8')).toMatch(`"prefix": "${prefix}"`);
    });

    it('should insert computed prefix in angular.json', () => {
        const tree = runner.runSchematic('ng-new', {name, title}, projectTree);
        const cliConf = tree.read(`${name}/angular.json`);
        expect(cliConf).not.toBeNull();
        // @ts-ignore
        expect(cliConf.toString('utf8')).toMatch(`"prefix": "${name.substr(0, 2)}"`);
    });

});
