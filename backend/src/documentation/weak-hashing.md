# Weak Hashing 
Weak cryptographic hashes should not be used in security contexts since they cannot guarantee data integrity.

## The Basics
The term “hash” relates to a one-way hash function -  a mathematical formula that takes an arbitrary-length message and returns a fixed-length value. These hashing functions should have an easy to calculate the hash value and it should also be difficult to reverse the computed hash values back to the original message. Still, it must be hard/impossible to find two inputs that generate the same hash value.

The hash functions are widely used in many security backgrounds such as digital signatures, public-key encryption, message authentication, and many other cryptographic contexts. 

Moreover, since any hash function takes the input of arbitrary length but outputs to fixed-length value there exist infinite many collisions. That is different inputs that nevertheless result in the same output. Therefore, algorithms once thought of as secure and unbreakable have become either weak or breakable because many of its dependent on computational power. MD5 and SHA-1, for example, was seen as a secure and strong hashing algorithm that went from being an unbreakable hashing algorithm to a weak hashing algorithm to a broken hashing algorithm. These weak cryptographic hashes are susceptible to various attacks thus, been marked as obsolete according to coding standards because it represents a high risk of the integrity of security-critical data to be compromised.

So, how do I know if a hashing algorithm is good?

Several entities publish official standards for hash functions, undergoing rigorous testing to ensure they are cryptographically strong, such as NIST, RIPEMD, Tiger, and SWIFFT. However, the algorithms most commonly required for government-related work are those of NIST. The National Institute of Standards and Technology (NIST) publishes official standards for hash functions called the Secure Hash Standard (SHS).

## Solving the Challenge
In this lesson, we are presented with a database leak with the username in plaintext and the password hashed with a weak algorithm.  

After looking into the table, we can easily grab the admin's hashed password. Notice that there are several online services that have millions of MD5/SHA-1entries stored such as,  [md5online](https://www.md5online.org/), [crackstation](https://crackstation.net/). For this solution, we have used [crackstation](https://crackstation.net/). After dehashing the password, we have the admin's credentials!

Just login with those credentials and the flag is all yours!

## Lesson Learned

* Do not use weak cryptographic hashes in security contexts
* Search for public official standards before using a crypto hash for security purposes, for example, NIST's Secure Hash Standard