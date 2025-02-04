# Confluence Updater

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

![Image](https://github.com/user-attachments/assets/33c5ab58-4d05-454a-b42a-ee50b1395023)

## Changes to make this work

Step 1 - Create an API token in Confluence 

Step 2 - Add your authHeader into ConfluenceService.ts

    private authHeader = `Basic ${btoa('[ email or username here]:[ API TOKEN ]')}`;

Step 3 -  For now you will need to manually add in the space-id for the titles you want to change in ConfluenceService.ts

    'space-id': '3087007783',

Step 4 -  change the proxy target to your confluence page

    "target": "https://[yourcompany name].atlassian.net",

Step 4 -  Run locally

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
