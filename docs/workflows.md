# Workflows

## Build

On every pull request or push to master a build action will be triggers. This workflow will:

- Install dependencies
- Run unit tests
- Run linter
- Build app

To be able to merge a pull request it is mandatory that this step succeeds


## Wiki

The entire wiki content is generated based on doc files in the project folder.

There are 2 folders where the action will look for:
- **/docs** - This folder has development documentation, like this file
- **/backend/src/docs** - This is where the challenge documentation for the user is. 

The action will convert the file name to upper case, and replace the '-' by a space.

Runs every time master is changed

## Deploy

There's a deploy action that runs when a new version is commited. When using yarn to bump the version of the app in package.json a tag in git will be created. This action will be triggered when that action shows up.

The action will build a docker image to deploy on dockerhub, as well as a package to deploy to npm. 

Besides that, github automatically creates a release zip file.
