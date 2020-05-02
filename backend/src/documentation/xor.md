# XOR 

XOR operation is the basics behing symetric encryption. Its important to undrstand how it works.

## XOR Table of Truth
The next table shows the result of the XOR operation between two values (A and B)

| A | B | A ⊕ B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

## Applying XOR to crypto
XOR operations are done at the bit level, so if you want to XOR two strings you need to first convert them into binary data.
Lets see an example:

The string **test**  in binary is 01110100 01100101 01110011 01110100 
To xor this string we need another string with the same length, lets say **ABCD** which maps to 01000001 01000010 01000011 01000100 

```
01110100 01100101 01110011 01110100 - test
01000001 01000010 01000011 01000100 - ABCD
------------------------------------------
00110101 00100111 00110000 00110000 - 5'00
```
This new value translates to **5'00**. As you can see, this has nothing to due with the original content

Due to XOR properties (like Commutativity and Associativity) there are a few details that you should have in mind:

### A⊕B=B⊕A
```
01110100 01100101 01110011 01110100 - test
01000001 01000010 01000011 01000100 - ABCD
------------------------------------------
00110101 00100111 00110000 00110000 - 5'00

01000001 01000010 01000011 01000100 - ABCD
01110100 01100101 01110011 01110100 - test
-----------------------------------
00110101 00100111 00110000 00110000 - 5'00
```
### A⊕B=C
```
01110100 01100101 01110011 01110100 - test
01000001 01000010 01000011 01000100 - ABCD
------------------------------------------
00110101 00100111 00110000 00110000 - 5'00
```
### B⊕C=A
```

01000001 01000010 01000011 01000100 - ABCD
00110101 00100111 00110000 00110000 - 5'00
------------------------------------------
01110100 01100101 01110011 01110100 - test
```

### A⊕C=B
```
01110100 01100101 01110011 01110100 - test
00110101 00100111 00110000 00110000 - 5'00
------------------------------------------
01000001 01000010 01000011 01000100 - ABCD
```

Why is this important? Lets assume that A is the text to encrypt and that B is the key. Then C is the encrypted content.
Looking at the operation above, we can see that if we XOR the key with the encrypted value we get the original one.

XOR operations are actually a really good and secure method to do crypto if they are used as a [One-time Pad](https://en.wikipedia.org/wiki/One-time_pad). 
This means that if the key is the same size as the plain text, completely random, never reused and secret, it will be impossible to decrypt the message without knowing it.

