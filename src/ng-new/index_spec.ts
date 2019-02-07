import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const name = 'foo';
const title = 'FOO';

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

});
