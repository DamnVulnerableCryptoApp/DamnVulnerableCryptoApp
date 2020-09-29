# Weak Hashing 
Weak cryptographic hashes should not be used in security contexts since they cannot guarantee data integrity.

## The Basics
The term “hash” relates to a one-way hash function -  a mathematical formula that takes an arbitrary-length message and returns a fixed-length value. These hashing functions should have an easy to calculate the hash value and it should also be impossible to reverse the computed hash values back to the original message. Still, it must be impossible to find two inputs that generate the same hash value otherwise they are considered insecure.

The hash functions are widely used in many security backgrounds such as digital signatures, public-key encryption, message authentication, and many other contexts. 

Moreover, since any hash function takes the input of arbitrary length but outputs a fixed-length value there can be collisions in theory. A collision is when different inputs that result in the same output. Therefore, algorithms once thought of as secure and unbreakable have become either weak or broken. MD5 and SHA-1, for example, were seen as a secure and strong hashing algorithms that went from being an unbreakable hashing algorithm to a weak hashing algorithm to a broken hashing algorithm. These weak cryptographic hashes are susceptible to various attacks thus, been marked as obsolete according to best coding standards because represent a high security risk.

So, how do I know if a hashing algorithm is good?

Several entities publish official standards for hash functions, undergoing rigorous testing to ensure they are cryptographically strong, such as NIST, RIPEMD, Tiger, and SWIFFT. However, the algorithms most commonly required for government-related work are those of NIST. The National Institute of Standards and Technology (NIST) publishes official standards for hash functions called the Secure Hash Standard (SHS).

## Solving the Challenge
In this lesson, we are presented with a database leak with the username in plaintext and the password hashed with a weak algorithm.  

After looking into the table, we can easily grab the admin's hashed password. Notice that there are several online services that have millions of MD5/SHA-1 entries stored, such as  [md5online](https://www.md5online.org/) and [crackstation](https://crackstation.net/). For this solution, we have used [crackstation](https://crackstation.net/). After searching in the website with the hash, we have the admin's credentials!

Just login with those credentials and the flag is all yours!

## Lesson Learned

* Do not use weak cryptographic hashes in security contexts
* Search for public official standards before using a crypto hash for security purposes, for example, NIST's Secure Hash Standard
