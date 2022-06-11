import SuperTest from "supertest"
import { app } from '../src/app'

export const request = SuperTest(app)
console.log = () => { }
console.error = () => { }
console.info = () => { }
console.warn = () => { }
console.error = () => { }
