import { IChallengeProps } from "../Challenge/IChallengeProps";
import AlgorithmDowngrade from "./AlgorithmDowngrade/AlgorithmDowngrade";
import BlockReordering from "./BlockReordering/BlockReordering";
import ByteAtATime from "./ByteAtATime/ByteAtATime";
import ChecksumCollision from "./ChecksumCollision/ChecksumCollision";
import ClassicCipher from "./ClassicCipher/ClassicCipher";
import InsecureRandom from "./InsecureRandom/InsecureRandom";
import IvDetection from "./IvDetection/IvDetection";
import KeyDisclosure from "./KeyDisclosure/KeyDisclosure";
import KnownPlaintextAndKeyReuse from "./KnownPlaintextAndKeyReuse/KnownPlaintextAndKeyReuse";
import PaddingOracle from "./PaddingOracle/PaddingOracle";
import WeakHashing from "./WeakHashing/WeakHashing";

export interface ChallengeData {
  name: string;
  description: string;
  url: string;
  component: (props: IChallengeProps) => JSX.Element;
}


const Challenges: ChallengeData[] = [
  {
    name: "Classic Cipher",
    component: ClassicCipher,
    description: "The oldest form of cryptography takes us back to ancient egypt and the hieroglyph. Some time after some simple substitution ciphers have been created and used frequently during wars.",
    url: "/classic-cipher",

  },
  {
    name: "Insecure Random",
    component: InsecureRandom,
    description: "Programming languages usually have a random function to help generating random values. These methods are heavily used used in security related features, but they are usually quite easy to predict",
    url: "/weak-random",

  },
  {
    name: "Weak hashing",
    component: WeakHashing,
    description: "Hashing is a good way of protect passwords, since data is lost in the process and its not reversible. Some algorithms are relatively easy to brute force, generate collisions and dictionaries are already available online for them.",
    url: "/weak-hashing",

  },
  {
    name: "Algorithm Downgrade",
    component: AlgorithmDowngrade,
    description: "It is worth nothing if you have the best and more secure algorithms in place, if you still accept old or insecure ones. Choosing an older álgorithm or version may lead to some security issues.",
    url: "/algorithm-downgrade"
  },
  {
    name: "Known Plaintext",
    component: KnownPlaintextAndKeyReuse,
    description: "Symmetric encryption is heavily based on XOR operations, and XOR has some nice properties, which if wrongly used can be used to retrieve plaintext data, or even keys",
    url: "/known-plaintext-and-key-reuse",

  },
  {
    name: "Byte At A Time",
    component: ByteAtATime,
    description: "ECB Mode of operation encrypts blocks of data independently. If there's content being appended to your data, you can play with the blocks and a bit of brute force to find each byte individually",
    url: "/byte-at-a-time",

  },
  {
    name: "Block Reordering",
    component: BlockReordering,
    description: "Since in ECB each block is independent, you can easily change the order of the encrypted blocks. And if you know what you're doing, you can cause serious damage",
    url: "/block-reordering",

  },
  {
    name: "IV Detection",
    component: IvDetection,
    description: "Although the IV was made to be public, keeping it secret can help keeping the encrypted data safe. Unfortunately there are ways to detect the IV used to encrypt data, if the system doesn't give it to you",
    url: "/iv-detection",

  },
  {
    name: "Padding Oracle",
    component: PaddingOracle,
    description: "Oracles give you nice error information, like if the padding is wrong, and if there was an error decrypting. This information can be helpful if you know how to use it.",
    url: "/padding-oracle",

  },

  {
    name: "Key Disclosure",
    component: KeyDisclosure,
    description: "Nearly every project uses Git nowadays. How many times did you see/commit to the repository a password or a key? Who can see it? Did you try to remove it? Is it an open source project?",
    url: "/key-disclosure",

  },
  {
    name: "MD5 collisions",
    component: ChecksumCollision,
    description: "MD5 has been considered unsafe for some time. But it is still frequently used for file checksums (among other things) due to its performance. But if the right conditions are met this can be exploited by an attacker.",
    url: "/checksum-collisions",

  },





];


export default Challenges;