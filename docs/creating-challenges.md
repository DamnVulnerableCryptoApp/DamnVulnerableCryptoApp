# Challenges

## Creating a challenge

* Choose a scenario for your challenge. You can use one of the ideas in [Challenge Ideas](https://github.com/DamnVulnerableCryptoApp/DamnVulnerableCryptoApp/wiki/Challenge-Ideas)
* duplicate the challenge template folder at /frontend/src/Challenges/ChallengeTemplate, rename it and adapt it to your needs.
* Add your challenge to /frontend/src/Challenges/Challenges.tsx. Use a meaningful name, and use it for the url (with hyphen if needed)
* In the backend create a controller and a service files. Make sure to follow the same structure as the other files. The path and url of the controller should reflect the algorithm being used as well as the name of the challenge (see other controllers for examples)
* Added the necessary unit tests.
* Document all the security issues of your challenge at docs/app/security-issues-checklist.md
* Write the necessary documentation. All challenges should have a nice to read documentation, explaining the issue being exploited in the challenge, as well as step by step hpw to solve it.
  * Store your doc at docs/app/URL-OF-YOU-CHALLENGE-DEFINED-IN-FRONTEND.md
  * Do not show the final flag in the doc
  * Use the same structure as the other files. ("The Basics", "Solving the challenge" and "Lesson learned")
  * To add images, make sure the images are stored in docs/app/img and **use a relative path** in the markdown (ex: img/myimage.png)
  * Make sure you link your documentation in file docs/app/crypto.md
* If your challenge has some easter eggs let us know so we can keep track of all the nice things :)
* Do not introduce new dependencies in the project, for a security reason
