# Padding Oracle Attack

For this section is important that you read and understand the [XOR docs](/docs/xor).

## The Basics

Firstly, to understand the _padding oracle attack_ also known as _Vaudenay attack_ it is important to know clearly the meaning of **padding** and **oracle**.

### Padding

The CBC mode encrypts blocks with the same block length. As you may think, certainly not all the plaintext messages length are a multiple of the cipher block length. So, how this problem can be solved? How a 14-byte message is encrypted where cipher blocks are 8 bytes? One of the techniques used is **padding**.

The **padding** makes the ciphertext longer than the plaintext to maintain each block with the same size allowing to encrypt a message of any length. For block ciphers, padding is applied according to the [PKCS#7](https://en.wikipedia.org/wiki/Padding_(cryptography)#PKCS#5_and_PKCS#7) standard and [RFC 5652](https://tools.ietf.org/html/rfc5652#section-6.3). The standard says, the value to pad with is the number of bytes of padding that remains to fill a block. More technically, the message is expanded and extra bytes are added to the plaintext in order to complete a block. 

For example, let's try to encrypt `FAKEGUY` with a block size of 8 bytes. The message would be padded to `FAKEGUY\x01`. Why `\x01` at the end? According to the standard mentioned above, if there is one byte to complete the block, the message is padded with `\x01`. If there were two bytes the pad would be with `\x02`. Let's show a practical example of how this works with different message lengths and their pads.

```
Block size: 8 bytes

     Message                     Padded Message
     
     FAKEGUY (7 bytes)   -->      FAKEGUY\x01
     
     FAKEGU (6 bytes)    -->      FAKEGU\x02\x02
     
     FAKE   (4 bytes)    -->      FAKE\x04\x04\x04\x04
```

Now with a message longer than 8 bytes.

```
     FAKEGUYROCKS (12 bytes)     -->    FAKEGUYROCKS\x04\x04\x04\x04

```

The message `FAKEGUYROCKS` is 12 bytes long so, the message is split into two blocks with a total of 16 bytes (8 + 8 bytes). The padding was added due to in the last block was not complete. Thus, a pad of `\x04\x04\x04\x04` was added because four bytes were remaining.

Additionally, if the message is a complete multiple of the size block, **padding is still added**, an empty block to be more precise. This looks a nonsense feature, I can feel your brain-blowing, right now.

_Why adding a pad if the message length is a multiple of the block size?_ 

Well, imagine if your plaintext is literally `POTATO\x02\x02`. How could you distinguish a plaintext which content is `POTATO` (6 bytes) and `POTATO\x02\x02` (the `\x02\x02` at the end it seems  padding, but in reality it's part of the string). As a result, a full length block like `POTATOES` (8 bytes) is padded to `POTATOES\x08\x08\x08\x08\x08\x08\x08\x08`.

### **Oracle**

An Oracle is a system (e.g. Web Application) that accepts arbitrary ciphertexts and it gives **different responses** where the padding in a CBC-encrypted ciphertext is **valid** or **not**. This system will perform cryptographic operations on behalf of the user or attackers like a black box which returns success or error responses. In other words, a padding oracle takes encrypted data or ciphertext from the user, tries to decrypt it, then responds if the padding was correct or not. The attacker can use this information to decrypt the original message.

---

Now you have the main knowledge to understand how this attack is performed. Let's get to the point.

---

## The Attack

To perform this attack is not needed to know the key, any plaintext or be an expert in math. Just access to a ciphertext you want to decrypt is enough. Firstly, pay attention to the diagram shown below of how the CBC mode decrypts a given ciphertext.

![CBC Decryption](img/cbc_decrypt.png "CBC Decryption")

The most relevant point how each block decryption ends. **The ciphertex of the block before is used to do an XOR operation with the output of the block cipher decryption**. The XOR of this two strings gives the plaintext message.

