# Security Issues CheckList

## Block Reordering
* Encrypted content can be manipulated
* Key Reuse
* Hardcoded crypto key
* ECB Mode
* Not using MAC
* Auth token being stored in local storage
* Trusting auth token received from user input
* Privilege escalation



## Byte at a Time
* Encrypted content can be decrypted
* Key reuse
* Hardcoded crypto key
* Hardcoded admin password
* Sending passwords to the view
* Security token being stored in local storage
* ECB Mode
* Not using MAC
* Privilege escalation


## IV Detection
* IV can be calculated
* Key reuse
* Hardcoded crypto key
* Repeated and hardcoded IV
* Not using MAC

## Padding Oracle
* Encrypted content can be decrypted
* Encrypted content can be created through decryption method
* Key reuse
* Hardcoded crypto key
* Repeated and hardcoded IV
* Auth token being stored in local storage
* Crypto errors being sent (Oracle)
* Privilege escalation
* Not using MAC

## Classic Cipher
* weak, old ciphers. Easy to reverse with cryptoanalysis

## Checksum Collision
* Use of deprecated hash algorithm
* Unrestricted file upload
* md5 collisions

## Weak Hash
* Passwords can be reversed
* Use of deprecated hash algorithm
* Common passwords used
* No Salt

## Known Plaintext 
* Encrypted content can be decrypted
* Key reuse
* Hardcoded crypto key
* Weak and insecure algorithm
* Not using MAC


## Key disclousure
* Content can be decrypted
* Content can be encrypted
* Private key committed to Git

## Weak Random
* Using preditable random algorithms
* Promotion Code bypass

## Algorithm Negotiation
* Hardcoded crypto key 
* Auth token being stored in local storage
* No validation of jwt algorithm
* Privilege escalation