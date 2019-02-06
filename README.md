# Overview

This repository contains a single schematic usable with angular CLI `ng new…` command.

It will generate a new project in replacement of angular CLI default one. 

It can be used like this:

```bash
npm install -g angular-shell-schematic
ng new <app name> --collection=angular-shell-schematic [--directory=<folder name>] [--title=<some text>]
```

You can show a bit more logs by setting the VERBOSE variable:

```bash
VERBOSE=true ng new <app name> --collection=angular-shell-schematic [--directory=<folder name>] [--title=<some text>]
```

## What's in it?

- Based on Angular CLI 7.3.0
- TS Lint:
    - a few rxjs tslint rules
    - a few tweaks
- TS Config:
    - esnext module => unlock dynamic imports => see `docs/perfs.md`
    - es2015 target => don't care about IE and too old browsers
    - angular language-service for completion, error hints, … in templates in VS Code and Webstorm
- Docs:
    - nice starting point in `docs/` folder with several chapters around perfs, build, git commits, coding style guide, etc. => see `docs/`
    - generation of automatic docs via npm scripts (git book + compodoc) => see `docs/build.md`
- Package:
    - npm dependencies and scripts required for a decent project
- Perfs:
    - Icons:
        - npm script to generate an svg sprite => see `docs/perfs.md`
        - Include material icons
    - Bundles:
        - include npm scripts to use webpack-bundle-analyser, source-maps-explorer and bundle-buddy to better understand what is included in each generated bundle => see `docs/perfs.md`
- CI:
    - basic starting point for Gitlab CI
- Configuration:
    - generate `environment.ts` via a custom script (CLI) that allows much more flexibility than duplicating it and declaring a new environment in `angular.json` => see `docs/build.md`
    - include a starting point to create a release via npm scripts => see `docs/build.md`
- Serve:
    - declare a default reverse proxy => see `docs/build.md`
    - include a mock module using angular-in-memory-web-api to allows the frontend and backend team to work concurrently (the backend is emulated in memory) => see `docs/style.md`
- Tests:
    - use puppeteer for unit tests with karma
    - add jasmine-matchers for more explicit tests
    - add common stubs
- PWA:
    - include angular service worker
    - cache google fonts 
- UI:
    - include angular material with a well structured and standard approach supporting theming => see `docs/style.md`
    - Routing:
        - Angular modules are preloaded by default once the app has started
        - On back navigation, it is possible to come back to a scrolled position or anchor 
    - include a default navbar with activity indicator and responsive behavior 
    - include a snackbar service and an acitivity indicator service
    - include a not found component
- Redux:
    - include ngrx with effects, router serialization, meta-reducer store-freeze (for protection in development) and store-devtools (for compatibility with redux chrome extension)
    - include a standard lightweight router serializer for perfs
    - propose a simple default structure => see `docs/style.md`


## Development

### Building

Before testing it locally you need to build (transpile typescript to javascript).

```bash
npm run build
```

If you want to build automatically after changes, just use `tsc` watch mode:

```bash
npm run build -- -w
```

### Running locally

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

```bash
schematics .:ng-new --name=<app name> [--directory=<folder name>] [--title=<some text>]
```

Check the documentation with
```bash
schematics --help
```

### Debugging

You can debug it with the classic toolkit (chrome devtools or your IDE):

```bash
node --inspect-brk $(which schematics) .:ng-new --name=<app name> [--directory=<folder name>] [--title=<some text>]
```

With Chrome devtools for instance, you can then go to `chrome://inspect` and start debugging.
For Webstorm, you will need to create a node debugging task, etc.

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm run release --new-version=<semver>
npm publish
```

That's it!
