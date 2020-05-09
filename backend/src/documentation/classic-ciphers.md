

# Classical Ciphers

Classical ciphers were built before the appearence of computers and therefore were based on letters or symbols instead of bits. In contrast to modern cryptography, there not machines to compute messages with strong ciphers resulting all of them being crafted by hand. 

The systems used by the Greek or in Ancient Rome did not had the technology to perform the same mathemathical operations we can do today, they had to do everything with pen and paper. This fact makes them to be easily cracked with modern technology.  
The most famous classical ciphers are the Caesar Cipher and Vigenère Cipher.

---

## The Basics

Julius Caesar used this cipher during his legacy in Ancient Rome and is the main reason for this cipher being named the Caesar cipher. A particular note on this cipher is it uses a circular alphabet to prevent overflows when passed the end of the alphabet. In other words, when shifting letters and if the letter Z is reached, the next letter is A. Thus, starting again from the beginning of the alphabet. For example, if in our original message we have the letter Y, according to the Caesar Cipher the correspondent letter is three positions away. So, 3 positions away from Y, the result is letter B.

There is no particular reason for the shift being three; using this number is easy to encrypt messages with your head. 

For a better understanding, a more detailed example for the word **_FAKEGUY_** is provided below.


```

    Original word: FAKEGUY
    
    
    F >>3 I
    A >>3 D
    K >>3 N
    E >>3 H
    G >>3 J
    U >>3 X
    Y >>3 B
    
    Encrypted word: IDNHJXB

```
This process is applied to all the words of the original message.

Nowadays, this cipher is **easy to break**. It's as simple as **shift three letters back** to have the original message. There is no secret key used in the encryption process as it was predefined by a value of three; the security was relied on the incapacity of the enemy to figure out how to decrypt it.

---

## Solving the challenge

It's presented an image with some gibberish text. In fact, the message 