# Timing Attack

## The Basics

Timing attacks are possible when an application takes different amounts of time, responding to different scenarios.

For context, a common case is a login operation. Imagine a system that searches in the database for the supplied username, then when found hashes the password supplied and compares it with the hash from the database, checks if the user is locked, if needs to reset password etc. All of these operations will increase the response time, compared to a request where the username doesn't exist in the system.

This is where a timing attack can get into place, to find user accounts available in the system.

In a stable system even the string comparing of the hashes can be susceptible to a timing attack. To prevent it a secure string comparison should be implemented.

## Solving the challenge

To solve this challenge we created a tool called [BeOnTime](https://github.com/DamnVulnerableCryptoApp/BeOnTime) that helps performing Timing Attacks

THe idea is to brute force the usernames, and validate if some usernames take more time to process then others. This may reveal existing users in the application.

Capture a request made by the web application (with Burp for example) to use it with the tool.
BeOnTime requires you to add the placeholder '{{PLACEHOLDER}}' where you want to try multiple values, in this case, the username.

This is an example of the content of the file (lets cal it req.txt):

```plaintext
POST /timing-attack/login HTTP/1.1
Host: localhost:4000
Content-Length: 35
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36
content-type: application/json
Accept: */*
Origin: http://localhost:3000
Sec-Fetch-Site: same-site
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: http://localhost:3000/
Accept-Encoding: gzip, deflate
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8
Connection: close

{"username":"{{PLACEHOLDER}}","password":"asd"}
```

Then you need a username wordlist. You can use one for example one available in the awesome [SecList](https://github.com/danielmiessler/SecLists/blob/master/Usernames/cirt-default-usernames.txt) collection.

With this, running the BeOnTime is quite simple:

```bash
BeOnTime -r req.txt -w dict.txt
```

## Lesson Learned

It's hard to have in mind all possible scenarios where a timing attack can be performed, but be extra careful when dealing with sensitive/personal information and make sure you the requests take in average the same time, with different scenarios.

A common exploit vector is in string comparison, so make sure you use secure methods to do the comparison. When checking characters make sure you go through all, even if already identified that is a different string.
