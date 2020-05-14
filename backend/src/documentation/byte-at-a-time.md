# Byte At A Time

For this section is important you read and understand the [BLock cipher docs](block-ciphers)

## The Basics

This attack relies on the idea that with ECB mode each block is encrypted individually.
Also, for this attack to work you need to control part of the content being encrypted, preferably in the beginning of the content. This attack allows you the decrypt the content placed after your content.

Lets assume that you are supplying user input that is going to be encrypted in the following structure:

```[USERNAME];secret=thisisawesome```

Where username is controlled by you. 
Also, and to make this easier to demonstrate, lets assume that each block has 8 bytes (4 characters). This size is not good, and should not be used in any real world scenario :) 
If your username is 'best' this is the content that is going to be encrypted seperated into blocks:

| best | ;sec | ret= | this | isaw | esom | e... |
|------|------|------|------|------|------|------|

(lets ignore the padding bytes, let them be just dots)

Ok, so, to decrypt this, as the name says, we are going to try to brute force each block, a byte at a time. Lets see how:
Lets start by changing your username to AAA (which is one byte less then the number of bytes for each block).
This is how it gets divided and the respective encrypted content:

| AAA; | secr | et=t | hisi | sawe | some | .... |
|------|------|------|------|------|------|------|
| ade3 | aab9 | c991 | 6FE2 | FF0B | DCEF | 3294 |

Have in mind that this is not a real encryption output, its just to demonstrate the problem.

You, as an attacker don't know the content being encrypted, so you don't know there what is in the first block but you are going to brute force it. 
Since each block is encrypted individually, now you are going to start "guessing" the fourth char. You start sending each char possible, and when you get the first 4 bytes with the value 'ade3' you know that the 4th byte is the one you were trying. 

To give an example, you will start sending all possible content in the 4th byte: 'AAAA', 'AAAB', 'AAAC', etc when you try 'AAA;' you will get the output ade3 which is the one expected. So you found that the 4th byte is ','.
So now you go to the 3rd byte and do the same process: First you send your name with only 2 chars:

| AA;s | ecre | t=th | isis | awes | ome. |
|------|------|------|------|------|------|
| 64ad | 34bd | 0fed | 12da | aa90 | 3fea |

And again, you start brute forcing the 4th byte: 'AA;A', 'AA;B', 'AA;c', etc
Notice, that we are already sending the ';' that we found before.  Now we expect the result of the first block to be '64ad'
And when you send the s ('AA;s') you will get that output. So you know that after the ';' comes an 's'.
So you repeat this until you get the entire block. When you get the entire block, you do the same for the next block, and the other, and so on, until there are no more blocks do decrypt.


## Solving the challenge

So, we are not going to write a tool to do this, since there are already many for this
The challenge is asking for an admin password, and when the page is loaded it does a request to /aes/ecb/byte-at-a-time/request-access sending the username 'KeepingitFake' and returns a token. 

So we can assume that token is something encrypted, and that the username can be there.
To prove it we can intercept the request with a proxy and change the username, if the token changes, then probably it is being used in the token.

After checking that username is in fact being used in the token we now know our attack vector, and we can start bruteforcing.

We wrote a small python script to automate this, but you can find many available scripts through github to do the same logic

```python
import string
import requests 
import socket

URL = "http://127.0.0.1:1234/aes/ecb/byte-at-a-time/request-access"
BLOCKSIZE = 16
POSSIBLE_CHARS = string.letters + string.digits + string.punctuation

def makeRequest(data):
    r = requests.post(url = URL, headers = {'username': data}) 
    return r.json()['token']


def break_it(length):
    
    found = ""
    for i in range((length - 1), -1, -1):
        initial = "A" * i
        print("Sending " + initial)
        initial_response = makeRequest(initial).decode("hex")
        tmp = "A" * i + found
        ver = False

        for character in  POSSIBLE_CHARS:
            print("Trying new char " + (tmp + character))
            response = makeRequest(tmp + character)

            if initial_response[:length] == response.decode("hex")[:length]:
                found += character
                ver=True
                break

        if not ver:
            return found     
            
response = makeRequest("A" * (BLOCKSIZE / 2))
max_cipher_size = len(response) / 2 # since content is retrieved in hex. every two chars are one byte
print(b"Finished: " + break_it(max_cipher_size))

```

Notice that before the actual bruteforce we do a request first.
This is used to know how many blocks the encrypted content has.
Since we may fill username with some of A's we need to make sure the size of the encrypted content when we send as many A's as possible for 1 block. In this case since the blocksize is 16 bytes, we may end up sending 8 A's in each block.

When the script finishes you end up with the decrypted token (with the username filled as a bunch of 'A'). The decrypted content seems to have a password, as a way to validate you were given access to the page. Now you just need to insert the admin password in the webpage, and that's it, you get the flag.

## Lesson Learned

* Encrypting each block individually is bad, and easily bruteforced
* Due to that ECB mode is insecure and should not be used
* Do not send user passwords to the view


