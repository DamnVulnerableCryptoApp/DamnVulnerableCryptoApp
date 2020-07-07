# Weak Random

## The Basics

Random methods are quite useful in a lot of applications, but have you ever wondered how is a computer able to generate random information, when everything needs to be programmed?

In fact, what we call a random method is in reality a [Pseudo Random Generator](https://en.wikipedia.org/wiki/Pseudorandom_generator). What this means is that what it looks to you as random values have in fact a formula deriving new values. So if you know the formula you know the next "random" values.

There are a lot of algorithms for generating random values, and you can find a list of them [here](https://en.wikipedia.org/wiki/List_of_random_number_generators).

To understand the logic behind them, we are going to see how [Middle-square method](https://en.wikipedia.org/wiki/Middle-square_method) works. This is one of the first algorithms for generating pseudo random numbers.


The idea of a PRG (Pseudo Random Generator) is that you supply a initial value, and the next value will be derived from it. This is called a seed.

Lets assume that we seed Middle-square with value 937492. 
The algorithm will calculate the square of the seed which is 878891250064 and then will grab the the middle six digits, so you end up with 891250. And this is the next generated pseudo random value.
The next value will use 891250 as the seed


```
937492 * 937492 = 878891250064 = 891250
891250 * 891250 = 794326562500 = 326562
326562 * 326562 = 106642739844 = 642739
642739 * 642739 = 413113422121 = 113422
```

And so on.

If you study a good amount of values you can easily understand how the values are being calculated. 
Also, if you get one generated value, you can always predict the next ones, since the next value is based on the last one.

That's why this algorithm and the other PRG are not suitable for sensitive operations. So every time you need to generate secure random values like generating keys, passwords, coupon codes, etc you should not use the default random mechanisms.

Instead there are [Cryptographically secure pseudorandom number generator](https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator) which you usually find in most languages as a class called SecureRandom. 

These generators (CSPRNG) may also use algorithms to generate the next values, but they have some stronger properties. 

For example, in a CSPRNG giving a generated value you should never be able to predict the next value.

Also the seeds are obtained from a huge source of entropy, usually supplied from the operating system which uses user interactions, among other things, to generate random bytes.


## Solving the challenge

To predict random values we first need to find which algorithm is being used for the generation.

Usually each language uses one by default. So the first thing to do is to find in which language the numbers are being generated.

Since this is a webapp, maybe checking the server can help us understand the language being used. Lets do a request and see what we get

```
curl http://localhost:1234 -v
* Rebuilt URL to: http://localhost:1234/
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 1234 (#0)
> GET / HTTP/1.1
> Host: localhost:1234
> User-Agent: curl/7.58.0
> Accept: */*
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Vary: Origin, Accept-Encoding
< Accept-Ranges: bytes
< Cache-Control: public, max-age=0
< Last-Modified: Sat, 09 May 2020 10:58:23 GMT
< ETag: W/"aba-171f9160b91"
< Content-Type: text/html; charset=UTF-8
< Content-Length: 2746
< Date: Sun, 10 May 2020 09:36:36 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
...
...

```

You can see in the X-Powered-By header that the server uses Express which is a NodeJS framework. So here we have it, its Node/JS.

So the next step is to find which algorithm is used by Javascript, and after a little research you will see that the specification does not specify the algorithm to be used, so its up to the implementation to choose which one to use. 
Since NodeJS uses [V8](https://v8.dev/blog/math-random?showComment=1450389868643#c2004131565745698275), we can try to find V8's implementation. You will find that they are using XorShift128+ or XorShift128 (depending on the versions) 

We are not going into the details on how the algorithm works or how to predict it, since it is a little bit more complex, although it's purely reverse engineer the algorithm's math formula.

Anyway, if you do some searches you will find out that there are already projects to help you predict the next values. 

The one we use is called [XorShift128Plus](https://github.com/TACIXAT/XorShift128Plus)

According to the documentation, you just need to supply 5 generated numbers, and it will generate the next five for you.

Well, 5 is exactly the number of coupon codes we have :) 

But they have a weird format...
If you look at the response being received from the server you will see the raw random numbers being received:

```json
{
    "coupons": [
        0.7298310541679336,
        0.2693816233150699,
        0.2697640336977747,
        0.761160106925812,
        0.5631260871858565
    ]
}
```

and the corresponding coupon codes are 

```
DVCAPP-7298-3105-4167-9336-0000
DVCAPP-2693-8162-3315-0699-0000
DVCAPP-2697-6403-3697-7747-0000
DVCAPP-7611-6010-6925-8120-0000
DVCAPP-5631-2608-7185-8565-0000
```

So if you analyse this (or if you go to the frontend source code) you'll notice that the transformation is easy. The '0.' disappears, and then, for every 4 digits you have a -. At the end if values are missing to fill the 5th block they are filled with zeros.

So now, you have 5 random numbers, run them through [XorShift128Plus](https://github.com/TACIXAT/XorShift128Plus).
You will get the next 5. Choose on of them, put it in the coupon format and submit. Thats it.

## Lesson Learned

* Random concept is in fact PseudoRandom, not truly random
* Random methods are weak, and not suitable for providing security
* SecureRandom should be used for security related operations.