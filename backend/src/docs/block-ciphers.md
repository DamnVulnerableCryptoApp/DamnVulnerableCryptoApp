# Block Ciphers

As we saw in the [XOR](xor) section, XOR operations are quite secure, but one of the downsides is that the key needs to be the same size as the content to be encrypted. This is clearly a disadvantage.
A solution to this problem is to divide the data to be encrypted in smaller blocks, and each block uses the same key, this way. The length of the block is usually related to the algorithm used.

## Example

Assuming we want to encrypt the content **"Loremipsumidestduis"** and that the key is **"safe"**. Also, to make it easier to understand lets assume the block size is about 4 characters.

This is the basic of the block cipher:

```plaintext
Content: Lore mips umid estd uis0
Key:     safe safe safe safe safe
```

Now each block is encrypted separately with the key.

## Attacks

Although this fixes the problem with the key size, it also introduces some attack vectors like [Block Reordering](block-reordering) and [Byte at a Time](byte-at-a-time)

Due to the possible attacks there are a few modes of operation for block ciphers, like [EBC](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Electronic_codebook_(ECB)), [CBC](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_block_chaining_(CBC)), [CTR](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Counter_(CTR)) and others

ECB is basically what we saw above.  
The other modes try to use different approaches so that each block is not encrypted separately. Instead it uses some other data, usually from other encrypted blocks.
