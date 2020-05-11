# DamnVulnerableCryptoApp

![Logo](/frontend/src/Images/logo.png)

## Why?

If you try to learn a little bit more about crypto, either because you want to know how the attacks work or just because you want to do safe code, you end up diving really fast into the math behind the algorithms, and for a lot of people this is a NO.

**This project was created with some key points in mind:**
* Real world examples of the crypto attack vectors
* No need to write code to exploit a vulnerability that you are still trying to understand
* No challenge without a solution
* Dead simple documentation. No complex math, no complex formulas. Good old english
* A common place to test different attack vectors
* Make easy for everyone to understand crypto, attacks and preventions.
* Go straight to the point, the challenges are no brain teasers, just a scenario with a crypto vuln. 


## Build

(Make sure you have node installed)

```
npm install -g yarn 
yarn add -g typescript react-scripts
yarn run install-deps
yarn run build
```

## Run


### Running in Production mode
```
yarn run start
```

If you want to change the port:
```
PORT=4000 yarn run start
```

### Running for development

**NOTE:** This process will change in the near future

**In one terminal start the backend:**
```
cd backend 
yarn start
```
Or to run in a different port (default is 1234)
```
PORT=5000 yarn start
```

**And in another terminal start the frontend:**
```
cd frontend
yarn start
```


if you want to change the port (default is 4000):
```
PORT=3000
```
If you changed the server port you need to specify it here as well:
```
REACT_APP_SERVER_PORT=5000 yarn start
```

## Docker

To build the docker image run:

```
yarn build:docker
```

By default port 8081 is being exported,
So you can map it to your own port:

```
docker run -p 8081:8081 <IMAGE_ID>
```


## Documentation
comming soon...

## Other places to learn about crypto attacks
* [Crypton](https://github.com/ashutosh1206/Crypton)
* [RSACtfTool](https://github.com/Ganapati/RsaCtfTool)
* [CryptoHack](http://cryptohack.org/)
* [Cryptopals](https://cryptopals.com/)
* [MysteryTwister C3](https://www.mysterytwisterc3.org/en/)

## Security Issues CheckList

### Block Reordering
* Encrypted content can be manipulated
* Key Reuse
* Hardcoded crypto key
* ECB Mode
* Not using MAC
* Auth token being stored in local storage
* Trusting auth token received from user input
* Privilege escalation



### Byte at a Time
* Encrypted content can be decrypted
* Key reuse
* Hardcoded crypto key
* Hardcoded admin password
* Sending passwords to the view
* Security token being stored in local storage
* ECB Mode
* Not using MAC
* Privilege escalation


### IV Detection
* IV can be calculated
* Key reuse
* Hardcoded crypto key
* Repeated and hardcoded IV
* Not using MAC

### Padding Oracle
* Encrypted content can be decrypted
* Encrypted content can be created through decryption method
* Key reuse
* Hardcoded crypto key
* Repeated and hardcoded IV
* Auth token being stored in local storage
* Crypto errors being sent (Oracle)
* Privilege escalation
* Not using MAC

### Classic Cipher
* weak, old ciphers. Easy to reverse with cryptoanalysis

### Checksum Collision
* Use of deprecated hash algorithm
* Unrestricted file upload
* md5 collisions

### Weak Hash
* Passwords can be reversed
* Use of deprecated hash algorithm
* Common passwords used
* No Salt

### Known Plaintext 
* Encrypted content can be decrypted
* Key reuse
* Hardcoded crypto key
* Weak and insecure algorithm
* Not using MAC


### Key disclousure
* Content can be decrypted
* Content can be encrypted
* Private key committed to Git

### Weak Random
* Using preditable random algorithms
* Promotion Code bypass



## Contributors:

## License

DamnVulnerableCryptoApp is [MIT](https://tldrlegal.com/license/mit-license) licensed 




