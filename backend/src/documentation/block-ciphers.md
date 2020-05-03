# Block Ciphers

As we saw in the [XOR](/docs/xor) section, XOR is quite secure, but one of the downsides is that the key needs to be the same size as the content to be enrcypted. This is clearly a disadvantage. 
A solution to this is to divide the data to be encrypted in smaller blocks, and each block uses the same key, this way. The length of the block is usually related to the algorithm used. 

## Example

Assuming we want to encrypt the content **"Loremipsumidestduis"** and that the key is **"safe"**. Also, to make it easier to understand lets assume the block size is about 4 characters.

This is the basic of the block cipher:
```
Content: Lore mips umid estd uis0
Key:     safe safe safe safe safe
```

Now each block is encrypted seperatly with the key.

## Attacks 
Although this fixes the problem with the key size, it also introduces some attack vectors like [Block Reordering](/docs/block-reordering) and [Byte at a Time](/docs/byte-at-a-time)



