# Padding Oracle Attack

For this section is important that you read and understand the [XOR](/docs/xor) and [About Encodings](/docs/about-encodings) docs. 


## The Basics

Firstly, to understand the _padding oracle attack_ also known as _Vaudenay attack_ it is important to know clearly the meaning of **padding** and **oracle**. 

### Padding

The CBC mode encrypts blocks with the same block length. As you may think, certainly not all the plaintext messages length are a multiple of the cipher block length. So, how can this problem be solved? How is a 14-byte message encrypted where cipher blocks are 8 bytes? One of the techniques used is **padding**.

The **padding** makes the plaintext longer with extra bytes to maintain each block with the same size allowing to encrypt a message of any length. For block ciphers, padding is applied according to the [PKCS#7](https://en.wikipedia.org/wiki/Padding_(cryptography)#PKCS#5_and_PKCS#7) standard and [RFC 5652](https://tools.ietf.org/html/rfc5652#section-6.3). The standard says, the value to pad with is the number of bytes of padding that remains to fill a block. More technically, the message is expanded and extra bytes are added to the plaintext. That's how we have a complete block.

> Take in mind that one char is one byte in size. As an example, 8 chars are equal to 8 bytes. 

To compare how this is performed with a human-readable plaintext, the following example uses strings (read [About Encodings](/docs/about-encodings) docs if you have any doubt). Let's try to encrypt `FAKEGUY`  with a block size of 8 bytes (or 8 characters). The message would be padded to `FAKEGUY\x01`. Why `x\01` at the end? According to the standard mentioned above, if there is one byte missing to complete the block, the message is padded with `\x01`. If there were two bytes the pad would be with `x\02`. Let's show a practical example of how this works with different message lengths and their pads.


```
Block size: 8 bytes

Message: FAKEGUY --> 0x46414b45475559 (Hexadecimal)

     Message                              Padded Message
     
     0x46414b45475559 (7 bytes)   -->     0x46414b4547555901
     
     0x46414b454755   (6 bytes)   -->     0x46414b4547550202
     
     0x46414b4547     (4 bytes)   -->     0x46414b454704040404
```

Now with a message longer than 8 bytes.

```
Message: FAKEGUYROCKS --> 0x46414b45475559524f434b53 (12 bytes)

```
Becomes,
> 0x46414b45475559524f434b53**04040404**

The message `0x46414b45475559524f434b53` is 12 bytes (or 12 characters) long so, the message is split into two blocks with a total of 16 bytes (8 + 8 bytes). The padding was added due to in the last block was not complete. Thus, a pad of `04040404` was added because four bytes were remaining.

Additionally, if the message is a complete multiple of the size block, **padding is still added**, an empty block to be more precise. This looks a nonsense feature, I can feel your brain-blowing, right now.

> _Why adding a pad if the message length is a multiple of the block size?_ 

Well, imagine if your plaintext is literally `POTATO\x02\x02`. How could you distinguish a plaintext which content is `POTATO` (6 bytes) and `POTATO\x02\x02` (the `\x02\x02` at the end it seems  padding, but in reality it's part of the string). As a result, a full length block like `POTATOES` (8 bytes or chars) is padded to `POTATOES\x08\x08\x08\x08\x08\x08\x0\x08` which in hexadecimal is `0x504f5441544f45530808080808080808`.

### **Oracle**

An Oracle is a system (e.g. Web Application) that accepts arbitrary ciphertexts and it gives **different responses** where the padding in a CBC-encrypted ciphertext is **valid** or **not**. This system will perform cryptographic operations on behalf of the user or attackers like a black box which returns success or error responses. In other words, a padding oracle takes encrypted data or ciphertext from the user, tries to decrypt it, then responds if the padding was correct or not. The attacker can use this information to decrypt the original message.


> Now you have the main knowledge to understand how this attack is performed. Let's get to the point.


## The Attack

To perform this attack is not needed to know the key, any plaintext or be an expert in math. Just access to the cipher text and to the decryption method is enough. Firstly, pay attention to the diagram shown below of how the CBC mode decrypts a given ciphertext.

![CBC Decryption](/documentation/img/cbc_decrypt.png "CBC Decryption")

The most relevant point is how each block decryption ends. 

> **The ciphertext passes through the block cipher decryption and then its output is XORed with the previous ciphertext block**. The XOR of these two strings with the correct padding gives the plaintext message.


Imagine you have made a random request to a web application you use with the following **encrypted cookie value** and you want to decrypt it to know its content:

> 6A211E234529238AA323D4D562B35056

Assume the application is encrypting this value in CBC mode and PKCS#7 standard. The application receives this value, decrypts it, and sends the response based on it. The perfect scenario for a padding oracle attack! 

With this knowledge, there are 3 possible cases:

1. The ciphertext is valid - a successful response is sent;

2. Invalid ciphertext (with improper padding) -  error message;

3. Valid ciphertext with invalid padding -  error message.

To make this clear, if you can send different ciphertexts and result in different outputs upon its decryption, you know if the padding is valid or not. With this kind of knowledge, the attacker has the ability to decrypt any ciphertext.

To conclude, the goal is to find the correct ciphertext payload to get a successful response (200 OK), meaning we have the right value for the byte we want to decrypt. If it responds with an error (usually 500 error), it means the tampered ciphertext does not decrypt to a valid message. We can try other payloads to find a proper match.

Look for the example below, where the ciphertext is divided through the different blocks. 

![Ciphertext Block Division](/documentation/img/cipher_padding_oracle.png "Ciphertext Block Division")

As you can see the second cipher block decryption output is directly XORed with the first cipher block which the attacker has control. So, let's try to decrypt the second cipher block.

You can pickup a random C1 and substitutes it with the original ciphertext first block (**C1** || C2 || C3) and send itto the oracle. The **X** points to the output of **D(K, C2)**, the decrypted value of C2 which the value we are trying to figure out. 

**C1, C2, C3** are blocks of the ciphertext.

**D(K,C)** --> **D** is the decryption function, **K** is the key and **C** a ciphertext block. 

An example for the ciphertext payload is shown in the image below. 

For explanation purposes each block is 4 byte size.

> The payload: **00000000**4529238AA323D4D562B35056

![Padding Oracle Attack Payload](/documentation/img/payload_padding_oracle.png "Padding Oracle Attack Payload")

The value of P1 is irrelevant because our goal is to decrypt C2 so, we don´t care about the output of P1. P3 has not changed its output since we had only changed the first cipher block. Let's focus into decrypt the C2 block.

With C1 = 00000000, the cipher decrypted to the following plaintext value.

C1 block

> 00 | 00 | 00 | 00

Decrypted Value

> A8 | 09 | F7 | **2C** 

Notice that that the last  byte of C1 decrypts to a plaintext with invalid padding, **2C**.


Let's try another value by incrementing the last byte.

C1 block

> 00 | 00 | 00 | **01**

Decrypted value

> A8 | 09 | F7 | **2D** 


The output is another padding but with a different decrypted value **2D** since we change the last byte of C1.

If we continue to increment the last byte of C1 (until FF) we will find for sure a value that matches a valid padding sequence. When this value is hit, it will produce a successful response. This value is unique, so, the response will be different than the other 255 values.

Pay attention to the following case.

C1 block

> 00 | 00 | 00 | **2D**

Decrypted value

> A8 | 09 | F7 | **01** 

The last byte of C1 with the value of **2D** decrypted to a valid padding because the last byte of the decrypted value is **01**. According to the PKCS#7 standard, this is valid padding, so, we found the value we want!

> But how can we use this information to decrypt the C2 block?

Now is the easy part. We know the C1 last byte outputs valid padding (**2D**) and we know the plaintext output which is **01**. Now we can infer the value of X, the output of D(E,C2). If you have noticed, we can do that because the X value XORed with C1 outputs the plaintext. At this point, you may know XOR is a commutative operation. 

If,

> Plaintext = C1 XOR X

Then,

> C1 XOR Plaintext = X

And that's how we get the value of X (D(K,C2)).

In our example,

> 0x01 = 0x2D XOR X

So,

> X = 0x2D XOR 0x01

Finally,

> X = 0x2C

0x01 is plaintext[15] and 0x2D is C1[15].

We know the value of X (2C) and we are able to deduce the final value of the plaintext last byte. Simply XOR X with the previous original ciphertext block which is **6A211E23**. Confused? Compare these steps with the diagram of the CBC decryption shown above.

At this time, the last byte of C2 is known; to find the rest of it, we can work backward through the entire block until every byte of X function is cracked, thus letting us decrypt the C2 plaintext one byte at a time. For the other blocks, it is just applying the same method to crack the full message.

## Lesson Learned

* A Padding Oracle Attack is a well known devastating attack against CBC and it will try to **break anything that uses CBC mode**.

* In the context of an application, It depends on how the user implementation of CBC mode because, if an attacker can modify the ciphertext, there are high chances he can break the encrypted message.

