# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Bugs and Improvements
* Bugs and improvement requests can be reported on Github under [issues](https://github.com/luisfontes19/damn_vulnerable_crypto_app/issues)
* Before opening an issue make sure there isn't already one opened with the same topic as yours.
* If an issue is not created yet, be sure to follow the issue templates  provided and expose your issue in a clear way.
* Be sure you provide enough information so that the team can understand your problem and work on solving it


## Helping with Documentation
* If you want to help with documentation be sure you read the 'Why?' section of the README.md file first.
* Follow our vision for the project:
  * Easy to understand
  * Avoid using formulas and calculations
  * Prefer simple examples demonstrating processes
  * Avoid writing code for demonstrations, use open source tools


## New Challenge Process
- After getting approval to a new challenge concept, copy the folder in /frontend/src/challenges/ChallengeTemplate and adapt it as you wish.
- For the backend part follow the structure used. In controllers folder, create or use the folder for the crypto algorithm you are using, and inside a controller file with the name of the vulnerability.
- Add the relevant documentation for the challenge you wrote. The docs should be stored in backend/src/documentation and the filename should be the same as the url for the challenge, defined in /frontend/src/challenges/challenges.tsx

## Pull Request Process
- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.
