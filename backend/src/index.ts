import dotenv from 'dotenv'
import path from 'path'
import { startServer } from './app'

export const isTesting = process.env?.NODE_ENV === "test"

const main = async () => {

  // from here forward process.env will have all variables from .env files
  dotenv.config({ path: path.join(process.cwd(), `.${process.env.NODE_ENV}.env`) })

  const app = startServer()
}

process.on('uncaughtException', (err: any) => console.error(err))
main()
