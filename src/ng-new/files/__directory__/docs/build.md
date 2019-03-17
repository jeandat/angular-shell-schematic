## Common tasks

### Configuring an environment

Angular default system being too limited, we are not using several `environment.<name>.ts` files.
Instead we are generating one dynamically from the command line via a yarn script.

```bash
yarn configure <flags>
```

Known flags:

- `prod` <Boolean> Are we in production mode? Default: false.
- `mocks`: <Boolean> Are we using mocks? Default: true.
- `base-name`: <String> Which base name before the `api` string. Default: ''.
- `api`: <String> Which backend api url?. Default: '/api'. If `api` is an absolute path, we respect it.
If relative, we construct an absolute path from current url.

To set a flag to true, use the `--flag` syntax.
To set a flag to false, use the `--no-flag` syntax.

Here is an example that build for prod without mocks, a base name and the default path api:

```bash
yarn configure --prod --no-mocks --base-name '/<%= name %>'
```

Flags of type <String> needs to be wrapped in quotes.

### Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use the `--prod` flag for a production build.

If you configure a base name, don't forget to also set it when building.

Here is an example for a production build:

```bash
yarn configure --prod --no-mocks --base-name '/<%= name %>' && yarn build --prod --base-href '/<%= name %>'
```

### Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

If you configure a base name, don't forget to also set it when serving:

```bash
yarn configure --base-name '/<%= name %>' && yarn start --base-href '/<%= name %>'
```

From time to time, you might also want to start your development server in production mode in order to test performance and load times during development.

```bash
yarn start:prod
```

Alternatively you can also serve your dist folder after a production build. That is the recommended way if you want to test your service worker:

```bash
yarn serve:dist
``` 

### Code scaffolding

Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running unit tests

Run `yarn test` to execute unit tests via [Karma] in watch mode (dev).
Run `yarn test:ci` to execute unit tests via [Karma] in single run mode (ci).

### Running end-to-end tests

Run `yarn e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Using a reverse proxy

`src/proxy.conf.js` can be used with `yarn start` to bypass CORS issues. For now, it is used by default.

It can also be enabled in `angular.json`.

```json
"serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
        "browserTarget": "<%= name %>:build",
        "proxyConfig": "src/proxy.conf.js" <------------------------HERE
    },
    "configurations": {
        "production": {
            "browserTarget": "<%= name %>:build:production"
        }
    }
},
```

## Creating a new revision

Obviously, the build and tests scripts must work before releasing anything. This is enforced here.

Look at the `preversion` and `postversion` scripts to better understand what is going on.

```bash
yarn version --new-version=<x.x.x> | --major | --minor | --patch
```

Using the `version` script will:

2. execute unit tests
3. mark a release in code by bumping `package.json` (following SEMVER rules)
4. create a commit and tag on current branch following pattern `vx.x.x`
5. push commits and tags to origin

## Generating docs

For those interested, a gitbook is generated with the `docs/` content. 

The readme also points to a compodoc generated documentation which might help newcomers to the project.

To test locally:

```bash
yarn serve:docs
```

To generate docs in a `public` folder:

```bash
yarn gen:docs
```

## Service worker

If you don't want to generate again a whole production build, you can refresh only the pwa part:

```bash
yarn gen:sw
```

You can serve your dist folder in order to test your production build with service worker via:

```bash
yarn serve:dist
``` 

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


[Karma]: https://karma-runner.github.io
