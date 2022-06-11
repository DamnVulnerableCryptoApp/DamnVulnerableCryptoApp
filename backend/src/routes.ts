
import Express from 'express-serve-static-core'
import { multerFunc } from './app'
import { BlockReorderingController } from './controllers/aes/BlockReorderingController'
import { ByteAtATimeController } from './controllers/aes/ByteAtATimeController'
import { IvDetectionController } from './controllers/aes/IvDetectionController'
import { PaddingOracleController } from './controllers/aes/PaddingOracleController'
import { SubstitutionController } from './controllers/classic/SubstitutionController'
import HealthController from './controllers/HealthController'
import { InsecureRandomController } from './controllers/InsecureRandomController'
import { AlgorithmNegotiationController } from './controllers/jwt/AlgorithmNegotiationController'
import { ChecksumCollisionsController } from './controllers/md5/ChecksumCollisitonsController'
import { HashLengthExtensionController } from './controllers/md5/HashLengthExtensionController'
import { WeakHashingController } from './controllers/md5/WeakHashingController'
import { KnownPlainTextController } from './controllers/rc4/KnownPlainTextController'
import { KeyDisclosureController } from './controllers/rsa/KeyDisclosureController'
import { TimingAttackController } from './controllers/TimingAttackController'
import { initRouter } from './router'

export const setRoutes = (app: Express.Express) => {

  const { get, post, put, patch, del } = initRouter(app)

  get("/health", HealthController, "index")

  get("/aes/ecb/block-reordering", BlockReorderingController, "index")
  get("/aes/ecb/block-reordering/isAdmin", BlockReorderingController, "admin")

  post("/aes/ecb/byte-at-a-time/request-access", ByteAtATimeController, "requestAccess")
  post("/aes/ecb/byte-at-a-time/admin", ByteAtATimeController, "admin")

  post("/aes/cbc/iv-detection/send", IvDetectionController, "send")
  post("/aes/cbc/iv-detection/encrypt", IvDetectionController, "encrypt")
  post("/aes/cbc/iv-detection/decrypt", IvDetectionController, "decrypt")

  get("/aes/cbc/padding-oracle", PaddingOracleController, "home")
  get("/aes/cbc/padding-oracle/isAdmin", PaddingOracleController, "admin")

  get("/classic/substitution", SubstitutionController, "index")
  get("/classic/substitution/check", SubstitutionController, "check")

  get("/jwt/negotiation", AlgorithmNegotiationController, "getPastes")
  post("/jwt/negotiation/anonymousAccess", AlgorithmNegotiationController, "requestAccess")


  post("/hash-length-extension", HashLengthExtensionController, "index")
  post("/hash-length-extension/data", HashLengthExtensionController, "data")

  post("/md5/login", WeakHashingController, "login")
  post("/md5/checksum", ChecksumCollisionsController, "checksum", multerFunc.fields([{ name: "file1" }, { name: "file2" }]))

  post("/rc4/known-plaintext-key-reuse/encrypt", KnownPlainTextController, "encrypt")
  get("/rc4/known-plaintext-key-reuse/history", KnownPlainTextController, "history")

  post("/rsa/key-disclosure/decrypt-mailbox", KeyDisclosureController, "decrypt")

  post("/hash-length-extension", HashLengthExtensionController, "index")
  post("/hash-length-extension/data", HashLengthExtensionController, "data")

  get("/random", InsecureRandomController, "index")
  get("/random/check", InsecureRandomController, "check")

  post("/timing-attack/login", TimingAttackController, "index")
  post("/timing-attack/forgot-password", TimingAttackController, "forgotPassword")
}