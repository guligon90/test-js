# TestJS (Solutions by *Guilherme Gonçalves* - [guligon90](https://www.github.com/guligon90))

TypeScript code base containing the solutions implementations to the problems covered in the technical assessment for the position of senior software engineer at [INO Games](https://www.linkedin.com/company/ino-games/?originalSubdomain=en).

## Preliminares

### Project dependencies

This project was implemented using the following tools:

- [Node Version Manager - `nvm`](https://github.com/nvm-sh/nvm#installing-and-updating): v2.2.13 or higher. Recommended manager for installing Node.js at the right version and the project dependencies;
  - [Node.js](https://nodejs.org/dist/v20.11.1/node-v20.11.1.tar.gz): LTS version (v20.11.1^) or higher;
  - [Yarn Package Manager - `yarn`](https://yarnpkg.com/getting-started): v1.22.21 or higher.

## Interaction

As one could expect in this context, the project automation is performed via a suite of Yarn commands located at the project's root [`package.json`](./package.json). So:

- To install project dependencies: `yarn install`;
- To run the unit tests, validating the solutions: `yarn test`;
- To apply code styling via Prettier: `yarn format`;
- To just lint the code via ESLint: `yarn lint`;
- To lint and fix minor code errors via ESLint: `yarn lint:fix`;
- To traspile TypeScript into JavaScript: `yarn build`.

For more information, simply run `yarn run`.
