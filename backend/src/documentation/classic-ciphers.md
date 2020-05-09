

# Classic Ciphers

Classic ciphers were built before the appearence of computers and therefore were based on letters or symbols instead of bits. In contrast to modern cryptography, there not machines to compute messages with strong ciphers resulting all of them being crafted by hand. 

The systems used by the Greek or in Ancient Rome did not had the technology to perform the same mathemathical operations we can do today, they had to do everything with pen and paper. This fact makes them to be easily cracked with modern technology.  
Classical ciphers are generally divided into [_**substitution**_](https://en.wikipedia.org/wiki/Substitution_cipher) and [_**transposition**_ ](https://en.wikipedia.org/wiki/Transposition_cipher) ciphers.



## The Basics

#### **How ciphers work in general?**


In a cipher there are two main elements: _**permutation**_ and _**mode of operation**_. 

A **permutation** is a function where a set of elements (can be a group of letters or bits) are arranged in a way that each element has a unique inverse. Technically is a function that arranges elements of a set into a sequence where the **order matters** or **linear order**.  For example, if the substitution of the letters A, B, C, and D maps to G, L, P, and W is a permutation because each letter as only one output. If the substitution of A, B, C, and D maps to L, L, G, and W is not a permutation because A and B have the same output.

A **mode of operation** is an algorithm or a method capable of encrypting messages of any size using permutation. Using a permutation that maps the word **POTATO** to **WBMLMB** results in the letters **O** and **T** producing the same output. We can see that using the same permutation for each letter exposes the presence of duplicates in the original message. The mode of operation performs the mitigation for this issue by using **different permutations** for duplicate letters of the plaintext.

As an example, let's talk about the Caesar cipher.

#### **The Caesar cipher**


Julius Caesar used this cipher during his legacy in Ancient Rome and is the main reason for this cipher being named the Caesar cipher. A particular note on this cipher is it uses a circular alphabet to prevent overflows when passed the end of the alphabet. In other words, when shifting letters and if the letter Z is reached, the next letter is A. Thus, starting again from the beginning of the alphabet. For example, if in our original message we have the letter Y, according to the Caesar Cipher the correspondent letter is three positions away. So, 3 positions away from Y, the result is letter B. The permutation used here is the **three-letter shift substitution** of the alphabet with the **same mode of operation** for each letter.

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

Nowadays, this cipher is **easy to break**. It's as simple as **shift three letters back** to have the original message. There is no secret key used in the encryption process as it was predefined by a value of three; the security of this cipher was relied on the incapacity of the enemy to figure out how to decrypt it.



## Solving the challenge

The presented image has some nonsense gibberish text. The message has many repeated letters, so, we can see the plaintext was encrypted with a simple substitution cipher. There is a cryptanalysis technique called **frequency analysis** which is the frequency of letters that appear in both plaintext and ciphertext. In this case, the ciphertext seems to have groups of words with a lot of repetitive letters. As we are using English in the challenges, we will use the English language as a reference.

The strategy is to look for the most repetitive letters in the ciphertext and compare them to the most frequent letters in the English language. This process is called the **letter frequency** of the ciphertext. Letter frequency is the average frequency a letter appears in written language usually measured in percentage. Higher the percentage of a letter, the higher probability to be that one. In this case, you can see here the frequencies for the English language. More particularly, there is a famous phrase in the English language called [**ETAOIN SHRDLU**](https://en.wikipedia.org/wiki/Etaoin_shrdlu). It is famous because it shows the  twelve most commonly used letters by order of frequency in the English language.

At this point, you know how to attempt breaking the ciphertext of this challenge. You can try on your own and do it manually to test if you understood the process of letter frequency. There are online tools that do this automatically, such as [this](https://quipqiup.com/) one.


After studying the letter analysis of the ciphertext, should result in the following message:

```
It was an ambush. Five or our men died. We got the goods. We leave at dawn

```

We have the plaintext message! 

But we can't get the flag yet. In the decrypted message input field, there are some numbers. These numbers represent the index of the letters in the plaintext. All we have to is check which letters are at each index.

The matching letters are:

```
iwbodteld

```
And we solve the challenge.

## Lesson learned

* Classic ciphers are limited old school algorithms built to be easy to make operations with your head as they don't have any computational power. Don't even think to use any of them to encrypt your messages.

* The strength of a cipher relies on the permutation operations and the mode of operation.  Due to the possibility of exposing duplicate letters of the plaintext, duplicate letters should have different permutations. This the purpose of using keys in cryptography. Different keys result in different permutations. **Never share your keys!!!**

* Frequency analysis is a widespread technique used in cryptanalysis. Using simple ciphers makes this technique very effective as they are not using random permutations and complex operations.