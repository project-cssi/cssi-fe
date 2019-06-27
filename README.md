<p align="center">
    <img style="display:block;text-align:center" src="./docs/logos/cssi-logo-dashboard.svg" alt="logo-text" width="800" />
    <p align="center" style="font-size: 1.2rem;">Front-End for the CSSI Platform</p>
</p>

<!-- Badges -->
<p align="center">
  <a href="https://travis-ci.org/project-cssi/cssi-fe">
    <img src="https://travis-ci.org/project-cssi/cssi-fe.svg?branch=master" alt="Build Status" height="18">
  </a>
  <a href="#contributors">
    <img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="All Contributors" height="18">
  </a>
<a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fproject-cssi%2Fcssi-fe?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fproject-cssi%2Fcssi-fe.svg?type=shield"/></a>
  <a href="https://david-dm.org/project-cssi/cssi-fe">
    <img src="https://david-dm.org/project-cssi/cssi-fe/status.svg" alt="dependencies Status" height="18">
  </a>
  <a href="https://david-dm.org/project-cssi/cssi-fe?type=dev">
    <img src="https://david-dm.org/project-cssi/cssi-fe/dev-status.svg" alt="devDependencies Status" height="18">
   </a>
  <a href="LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" height="18">
  </a>
  <a href="https://codecov.io/gh/project-cssi/cssi-fe">
  <img src="https://codecov.io/gh/project-cssi/cssi-fe/branch/master/graph/badge.svg" />
</a>
</p>

This repository contains the codebase for the CSSI front end. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) template.


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fproject-cssi%2Fcssi-fe.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fproject-cssi%2Fcssi-fe?ref=badge_large)

# Quick start

> The generated project have dependencies that require `node` together with `npm`.

**Make sure you have Node version >= 8.0 and (NPM >= 5 or [Yarn](https://yarnpkg.com) )**

```bash
# clone our repository
git clone https://github.com/project-cssi/cssi-fe.git

# change the directory
cd cssi-fe

# switch to development branch
git checkout develop

# install the dependencies with npm
npm install

# start the development server
npm start

```

Once the dev server is fired up, it'll automatically open up a new tab. If not, navigate to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) manually in your browser. (Note: If a port is already taken you'll be given the option to open the app in a different port.)

# Table of Contents

- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setting Up](#setting-up)
  - [Running the app](#running-the-app)
- [Configuration](#configuration)
- [Styling](#styling)
- [Testing](#testing)
- [Production](#production)
  - [Building the app](#building-the-up)
  - [Releases](#releases)
  - [Deployment](#deployment)
    - [AWS](#aws)
- [Linting](#linting)
- [Built With](#built-with)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

# File Structure

```
cssi-fe/
 ├── docs/                          * folder to house all the documents
 ├── node_modules/                  * contains dependencies pulled from npm
 ├── public/                        * the public folder which can be accessed with a URL
 │   ├── favicon/                   * contains all the favicons and device specific icons for the app
 │   ├── index.html                 * this is the app template
 │   └── manifest.json              * contains metadata for the app
 ├── src/                           * source folder
 │   ├── aseets/                    * folder containing all the static assets, meta and styles
 │   ├── components/                * contains all the reusable components
 │   ├── containers/                * contains the differenrt container types used in the app
 │   ├── elements/                  * houses the custom elemets such as buttons, inputs etc.
 │   ├── forms/                     * contains all the forms used in the application
 │   ├── redux/                     * redux folder
 │   │   ├── actions/               * contains all the redux action scripts
 │   │   ├── reduces/               * contains all the reducers
 │   │   ├── store.js               * redux store file
 │   │   └── types.js               * file containing all the redux action types
 │   ├── routes/                    * contains the routes of the app
 │   ├── services/                  * contains the service scripts for the app
 │   ├── utils/                     * folder to hold the utility function scripts
 │   ├── variables/                 * folder to house app variable scripts
 │   ├── views/                     * folder containing all the views of the application
 │   ├── api.js                     * contains all the api endpoints for the application
 │   ├── index.js                   * js entry-point for the application
 │   └── registerServiceWorker.js   * file which helps to serve assets from cache in production
 ├── .env.sample                    * sample of .env file
 ├── .eslintrc.js                   * ecmascript linting configuration file
 ├── .gitignore                     * contains files that are ignored from git
 ├── .gitlab-ci.yml                 * gitlab ci configuration file
 ├── .npmrc                         * npm config file to house project wide custom configs
 ├── .nvmrc                         * node version manager config file
 ├── .sass-lint.yml                 * sass lint config file
 ├── CHANGELOG.md                   * log of all notable changes made to the project
 ├── CONTRUBUTING.md                * project contributing guidelines
 ├── LICENSE.md                     * licensing information
 ├── package.json                   * contains all the npm scripts for building, running, deploying etc. and contains all the dependencies
 └── README.md                      * Readme file for the repository

```

# Getting Started

## Prerequisites

What you need to run this app:

- The generated project have dependencies that require `node` together with `npm`.
- Ensure you're running the latest stable versions Node and NPM.

> Make sure you have `Node` and `NPM` installed by running simple commands on the command line to see what version of each is installed.

- Node - Type `node -v` on the terminal.
- NPM - Type `npm -v` on the terminal.

If you do not have them installed, click [here](https://nodejs.org/en/download/) and grab the latest stable version of `node` and `npm` will be automatically installed along with it. Or if you have `brew` already installed in your local machine, execute `brew install node` command to get `node`.

## Setting Up

- `git clone https://github.com/project-cssi/cssi-fe.git` to clone the repository
- `cd cssi-fe` to change the directory
- `git checkout develop` to switch to development branch
- `npm install` to install the dependencies with npm

## Running the app

After you have installed all dependencies you can now run the app. Run `npm start` to start a local server with `webpack`.
The dev server will be opened in a new tab and usually on http://localhost:3000 and the Access URLs will be displayed on the terminal.

# Configuration

Have a look in the [.env.sample](./.env.sample) file for the structure of the `.env` file.

# Styling

The stylesheets are inside the `assets/sass` folder and the `cssi-dashboard.scss` file inside the directory is the main stylesheet for the project.
If you want to add your own stylesheet, we recommend that you place it under the `sass/partials` folder and import it in the `cssi-dashboard.scss` file.

For example if you want to include the styles for a slider:

1. Create a `_slider.scss` partial file in the `sass/partials` directory.
2. In `cssi-dashboard.scss` add `@import 'partials/slider.scss';`

# Testing

The app uses Jest and Enzyme frameworks for testing and you can run the test suite by executing the following command.

```bash
npm run test
```

# Production

Follow the steps bellow to build a production ready version of the application.

## Building the app

Execute the following command to build the application with webpack in production mode.

```bash
npm run build
```

## Releases

Read the instructions in the [RELEASE.md](./docs/RELEASE.md) file for a full list of realease strategies.

## Deployment

### AWS

If you want to deploy the application to a s3 bucket please execute the following command replacing `bucket_name` with the intended s3 bucket name.

The script for this command can be found in the `scripts/deploy-s3.js`. Feel free to change it if needed.

```bash
npm run deploy-s3 bucket_name
```

# Linting

To run the linting on the command line, execute the following command.

```bash
npm run lint
```

# Built With

<a href="https://reactjs.org/" title="React"><img src="./docs/technologies/react.png" alt="react" height="30" /></a>&nbsp;&nbsp;
<a href="https://redux.js.org/" title="Redux"><img src="./docs/technologies/redux.png" alt="redux" height="30" /></a>&nbsp;&nbsp;
<a href="https://lodash.com/" title="Lodash"><img src="./docs/technologies/lodash.png" alt="lodash" height="30" /></a>&nbsp;&nbsp;
<a href="https://webpack.js.org/" title="Webpack"><img src="./docs/technologies/webpack.png" alt="webpack" height="30" /></a>&nbsp;&nbsp;
<a href="https://www.npmjs.com/" title="npm"><img src="./docs/technologies/npm.png" alt="npm" height="30" /></a>&nbsp;&nbsp;
<a href="https://sass-lang.com/" title="Sass"><img src="./docs/technologies/sass.png" alt="sass" height="30" /></a>&nbsp;&nbsp;
<a href="https://getbootstrap.com/docs/4.0/getting-started/introduction/" title="Bootstrap"><img  src="./docs/technologies/boostrap.png" alt="bootstrap" height="30" /></a>&nbsp;&nbsp;
<a href="https://jquery.com/" title="Jquery"><img src="./docs/technologies/jquery.png" alt="jquery" height="30" /></a>&nbsp;&nbsp;

# Changelog

Please refer [CHANGELOG.md](CHANGELOG.md) to learn about the latest improvements, breaking changes and bug fixes.

# Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for contributing guidelines and to learn about our code of conduct.

# Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/25959096?v=4" width="80px;" alt="Brion Mario"/><br /><sub><b>Brion Mario</b></sub>](http://www.brionmario.com/)<br />[💻](https://github.com/project-cssi/cssi-frontend/commits?author=brionmario "Code") [📖](https://github.com/project-cssi/cssi-frontend/commits?author=brionmario "Documentation") [🐛](https://github.com/project-cssi/cssi-frontend/issues?q=author%3Abrionmario "Bug reports") [⚠️](https://github.com/project-cssi/cssi-frontend/commits?author=brionmario "Tests") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

# License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details