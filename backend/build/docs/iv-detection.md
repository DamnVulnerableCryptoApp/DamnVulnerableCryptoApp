# Iv Detection

For this section is important (again) that you read and understand the [XOR docs](xor)

## The Basics

We can explore the way CBC works to retrieve the IV of an encrypted content.
The IV can be used for other attacks like Padding Oracle, if the IV is being reused for other encryptions, for example.

To exploit this scenario there are a few conditions that need to be met.

1 - Access to encrypt data  
2 - Access to decrypt data  
3 - Padding check disabled

Lets recap first how CBC decryption works

![CBC Decryption](img/cbc_decrypt.png "CBC Decryption")

As you can see the first encrypted block is XORed with the 2nd decrypted block, giving us the second block of plain text. And the second encrypted block is XORed with the decrypted 3rd block, and so on ...

A specially crafted ciphertext can be used to exploit this way of working, to give us the IV.

Lets see by example, how this works. Again lets assume a custom CBC  encryption, and since we are going to see this in binary (which is easier to understand) lets assume that each block takes 4 digits (bits).

For this example lets also say that the encrypted content of a random string, in binary, is 011000010111.

The specially crafted payload is calculated by using the first block, then a block filled with zeros, followed by the first block again:

```plaintext
0110 - First Block Of Encrypted Content
0000 - Null Block
0110 - First Block Of Encrypted Content

Final Payload: 011000000110
```

The decryption of the content is processed as follows, according to the schema above (assuming IV is 11111):

```plaintext
Decrypted1stBlock = Decrypt(FirstBlock)  ⊕ IV           | 1101 ⊕ 1111 = 0010
Decrypted2ndBlock = Decrypt(SecondBlock) ⊕ FirstBlock   | 0101 ⊕ 1101 = 1000
Decrypted3rdBlock = Decrypt(ThirdBlock)  ⊕ SecondBlock  | 1101 ⊕ 0000 = 1101
```

Remember that XORing something with 0000, you end up with the original content, so Decrypted3rdBlock is the same as Decrypt(ThirdBlock) which is the same as Decrypt(FirstBlock)

And Decrypted1stBlock is the same as Decrypt(FirstBlock) ⊕ IV

If we xor both:

```plaintext
(Decrypt(FirstBlock)  ⊕ IV ) ⊕  Decrypt(FirstBlock)
```

Since XORing the same value twice, its the same as not having them in the equation, we end up with the IV

## Solving the challenge

We can easily find by inspecting the requests that there's an endpoint to encrypt data at /aes/cbc/iv-detection/encrypt.

If you do some checks you'll see there's one to decrypt at /aes/cbc/iv-detection/decrypt

So now, we just need to automate the operations above.  

Here's some python code to do it:

```python
from Crypto.Cipher import AES
from os import urandom
import requests
import json

URL = "http://127.0.0.1:4000/aes/cbc/iv-detection"

# Lets encrypt some content
plaintext = "Some content to be encrypted"
r = requests.post(url = URL + "/encrypt", headers = {'content-type': 'application/json'}, data = json.dumps({"data": plaintext}) )
encryptedContent = r.json()["data"].decode("hex")

# Prepare our formula
firstBlock = encryptedContent[:16]
ciphertext = firstBlock + ("\x00" * 16) + firstBlock

# Ask to decrypt data
r = requests.post(url = URL + "/decrypt", headers = {'Content-Type': 'application/json'}, data = json.dumps({"data": ciphertext.encode("hex")}))
decryptedData = (r.json()["data"] )


iv = ""
for i in range(16):
  #Xor first block with third
  xor = ord(decryptedData[i]) ^ ord(decryptedData[32+i])
  iv += chr(xor)

print "The iv is: ", iv
#else:

```

This retrieves the IV.

Now to get the flag you just need to send it in a message

## Lesson learned

* Do not reuse IV's
* Do not disable automatic padding (and validation)
