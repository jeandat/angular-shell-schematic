#!/usr/bin/env node

'use strict';

const meow = require('meow');
const Listr = require('listr');
const chalk = require('chalk');
const execa = require('execa');

const Git = require('nodegit');

const cli = meow(`
    Usage
      $ ./release.js <version>
 
    Options
      -h  Show help
      --no-ci Skip step 'npm ci'
      --allow-same-version, -a Allow overwrite of existing version
 
    Examples
      $ ./release.js 0.1.0
`, {
    description:'Create a new release (reinstall dependencies, bump all versions, create commit with tag and push)',
    flags:{
        help:{
            type:'boolean',
            alias:'h'
        },
        ci:{
            type:'boolean',
            default:true
        },
        allowSameVersion:{
            type:'boolean',
            alias:'a',
            default:false
        }
    }
});

if (cli.flags.help) return cli.showHelp(0);

const newVersion = cli.input[0];
if (!newVersion) return cli.showHelp(1);

const tasks = new Listr([
    {
        title:'Check master is the current branch',
        task:async (ctx) => {
            const repo = ctx.repo = await Git.Repository.open('.');
            const branch = await repo.getCurrentBranch();
            if (branch.name() !== 'refs/heads/master')
                throw new Error('Releases are not authorized outside of master');
        }
    },
    {
        title:'Check absence of local changes',
        task:async (ctx) => {
            const changes = await ctx.repo.getStatus();
            if(changes && changes.length > 0)
                throw new Error('Working directory is not clean')
        }
    },
    {
        title:'Check absence of server changes',
        task: async () => {
            const {stdout} = await execa.shell('git log master..origin/master');
            if(stdout.length) throw new Error('Working directory is not in sync with origin');
        }
    },
    {
        title:'Reinstall dependencies',
        skip:() => !cli.flags.ci,
        task:() => execa.shell('npm ci')
    },
    {
        title:'Run tests',
        task:() => execa.shell('npm test')
    },
    {
        title:'Create version',
        task:() => execa.shell(`npm version ${newVersion} ${cli.flags.allowSameVersion ? '--allow-same-version' : ''} -m "chore: mark version %s"`)
    },
    {
        title:'Push',
        task:() => execa.shell('git push && git push --tags')
    }
]);

tasks.run().catch(err => {
    console.log();
    console.error(chalk.red(err && err.message || err));
});

