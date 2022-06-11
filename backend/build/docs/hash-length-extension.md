# Hash Length Extension Attack

## The Basics

One of the many uses of the hash functions is for integrity check, to make sure that a file did not change, or did not get corrupted while downloading for example.
With this, a similar concept is used, where the hash used with a secret content is used to authenticate the file stating that it wasn't manipulated.

But instead of using proper message authentication code (MAC) algorithm (which behind the curtains also use hashing) developers tend to use regular hashing algorithms with a secret.

If the secret is pre-pended to the content being authenticated this can lead to a hash length extension attack.
This is because an attacker, knowing the size of the secret the signature (the hash) and the original content, is able to reproduce the internal state of the hashing function, and so, it can keep adding new content to the original content. At the end it will end up with a new signature (hash) that will be the same as if the new content was signed (hashed) through the original method with the secret.

## Solving the challenge

To exploit this vulnerability we like to use the tool [hashpump](https://github.com/bwall/HashPump).

And all it takes is the original content, the signature and the length of the signature.

If you go to local storage, you'll see two parameters for this challenge: ***hle-auth-data*** and ***hle-auth-signature***

Since we do not know the length of the signature, we can do a script to brute force it. For sake of simplicity we'll tell you its 43, but you can try to find it by yourself.

```bash
./hashpump -s "472d80142458b1e4aa29696ed1ccd9e42e4fcb5e5bfbe8a4ed188e56bd0ab51a" --data "56476870637942706379427164584E30494746756233526F5A5849675A57467A644756794947566E5A793467534746325A534235623355675A6D3931626D51676447686C625342686247772F" --additional "asd" -k 43
```

After running this command you will end up with manipulated data end a new signature (hash). Replace both in localstorage and refresh the page.

## Lesson Learned

* Do not use hashing functions to authenticate data
* Use specific algorithms like HMAC for authenticating data
  * Have in mind that HMAC with md5 is considered insecure.