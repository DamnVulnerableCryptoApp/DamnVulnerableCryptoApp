# About Encodings

This is an important part to understand all the examples throughout this documentation, as content may be encoded in different formats.


# Bits, Bytes and Hex

Lets start by understanding what is a bit and a byte.

## Bit
The bit is the smallest unit of information, it can be represented as a 1 or a 0 

## Byte 

A byte is composed of 8 bits, and its usually the necessary size to store for example a character.

## Hex

The most common way to represent bytes is in hexadecimal (Hex).
In the hex system every two chars represent a byte, and on its one a byte can represent a character. 
A bit confusing right?

Lets see an example:

The letter 'A' in HEX is represented by 41, that corresponds to 1 byte.  
The word crypto in hex is represented by 63 72 79 70 74 6F which are 6 bytes. 

Again, remember that seeing something in hex, although is represented as 2 chars, it is probably only one readable char.


Also, from a development point of view, instead of being encoding hex to text and/or back there is a specific way to introduce hex encoded bytes in the middle of a string. This is usually done by appending '\x' before the hex value.

For example, the string "crypto" can be also represented as "\x63rypto", where \x63 is a 'c'


# Base64

Another common way to represent byte data is on base64 which has a smaller output that the Hex notation.


Encoding bytes in hex or base64 is important, specially in crypto because there are a lot of bytes that do not have a printable representation, or in other words, they cannot be displayed, like an 'a' or a 'b'. And example of this is the byte 00, also known as the null byte.


# Ascii 

[Ascii](http://www.asciitable.com/) is a basic encoding, where you can represent most common characters, as a number between 1 and 127 

# Tools

There is an awesome website that helps with this conversions, and many other crypto related operations, called [cryptii](https://cryptii.com/) that we recommend you to check out.