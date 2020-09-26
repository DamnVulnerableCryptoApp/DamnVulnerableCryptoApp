# Key Disclosure

## The Basics

Disclosing keys and passwords is still a big issue now a days, special in open source projects.

On early developments stages developers tend to hardcode passwords and keys, to work on a feature, to make it work. Eventually these passwords or keys get into source control and anyway with access to the code (if an open source project its everybody) can see it.

A common mistake is to do a new commit, removing the password/key but it is already on source control, and you can go back and find it.

There are a lot of tools to crawl git repositories looking for sensitive information like passwords and keys like [TruffleHog](https://github.com/dxa4481/truffleHog) and [Gittyleaks](https://github.com/kootenpv/gittyleaks)

## Solving the challenge

## Lesson Learned

* Do not hardcode sensitive information like password and crypto keys
* Use environment variables, keystores or vaults to store your passwords/keys
* Do not commit sensitive files like private keys and keystores
