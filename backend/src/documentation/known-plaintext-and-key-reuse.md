# Known Plaintext

For this section is important that you read and understand the [XOR docs](/docs/xor)

## The Basics

A Kown Plaintext can happen when an attacker as access to both the plain text content and the encrypted content.
These can be used to find other information like the secret key used in the encryption process.

As seen in the XOR documentation where  A⊕B=C  and A⊕C=B an attacker can use the same logic with weak cryptographic algorithms to retrieve the key being used, or even to decrypt other messages

With RC4 This same principle applies.

So if you encrypt a plaintext message with a key and use that output (the encrypted text) and encrypt it again with the same key, you will get the plain text value.

Although this is probably all you need to break the algorithm, there are other ways of doing it...

And to explain it we need a few formulas (bare with me, they are really simple):
```
M1⊕K=C1
M2⊕K=C2

C1⊕C2=(M1⊕K)⊕(M2⊕K) = M1⊕M2 (Xoring two times the key, will null the key)
M1⊕M2⊕M2 = M1
```

Putting this into words, assuming there's a message M1, unknown to us but we know the ciphertext of it (C1), and that an attacker can encrypt a message (M2) and that he knows the encrypted content of M2 it's C2 then if an attacker XOR's both encrypted messages he will get a result which is the same as XORing of the two original plaintext's. And since the attacker knows its own plaintext, which is M2, if he XOR's it back it will get M1, which is the unknown message

## Solving the challenge

Lets see how to solve both ways. 
The first one which is actually the easiest is the one automatically recognized by the application. 

The flag is hidden in one of the encrypted messages: 
```
df75d1ce00d8112f827061a19aff2392ebc39b054e10b8923ffb64b391c8440c065cd63b
```

So to decrypt it you just need to send it to be encrypted, and you will end up with the original plaintext.
BUT, this string is in Hex, and if you send this content it will be interpreted as a regular string, so you need to tell the server this is actually hex. You can do it by adding \x every two characters:


```
\xdf\x75\xd1\xce\x00\xd8\x11\x2f\x82\x70\x61\xa1\x9a\xff\x23\x92\xeb\xc3\x9b\x05\x4e\x10\xb8\x92\x3f\xfb\x64\xb3\x91\xc8\x44\x0c\x06\x5c\xd6\x3b
``` 

But again, this is being json encoded, which means that \x will be treated as two regular characters, so you need to change this in the request. Set up a proxy and catch the request, change the content to be encrypted to the content above, and that's it. The server will reply with the "encrypted" content, which is the original flag



**Now lets see how to do this the harder way**
So we need an encrypted content, and to be easier lets encrypted the same number of bytes as the encrypted flag (72bytes which is 36 characters)

Submit the following string to be encrypted:
```
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```


This will give you:
```
892c899950814477ce2339f4c2b37692bdc0d7054d45b8de3bfb3ce7c1cb415456598468
```

Now you have your encrypted string, and the flag encrypted in history:
```
df75d1ce00d8112f827061a19aff2392ebc39b054e10b8923ffb64b391c8440c065cd63b
```

Now xor both strings. There are tons of online services to do that like [xor.pw](http://xor.pw/). no coding needed:

You should get this:
```
56595857505955584c535855584c550056034c000355004c040058545003055850055253
```

Remember, this is the same as the plaintext of the flag, xored with the 16 a's.
So now you just need to xor this with the 16 a'x, and you'll get back the flag.

First convert the 16 a's to hex:
```
616161616161616161616161616161616161616161616161616161616161616161616161
```

Now XOR them with the previous string and you'll get the value of the flag, in HEX, you just need to convert it to text.

## Lesson Learned

* Using the same key more than once is bad, and can leak information 
* RC4 is a really insecure algorithm. Do not use it
 



