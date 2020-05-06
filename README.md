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

```
yarn run start
```

If you want to change the port:
```
PORT=4000 yarn run start
```

### Running in dev environment

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


## Documentation
comming soon...

## Other places to learn about crypto attacks
* [Crypton](https://github.com/ashutosh1206/Crypton)
* [RSACtfTool](https://github.com/Ganapati/RsaCtfTool)
* [CryptoHack](http://cryptohack.org/)
* [Cryptopals](https://cryptopals.com/)
* [MysteryTwister C3](https://www.mysterytwisterc3.org/en/)

## Contributors:

## License

DamnVulnerableCryptoApp is [MIT](https://tldrlegal.com/license/mit-license) licensed 




