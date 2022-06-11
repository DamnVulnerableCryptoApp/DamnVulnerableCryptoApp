import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from "express"
import multer from "multer"
import path from 'path'
import { cspMiddleware } from './middlewares/cspMiddleware'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { requestLoggingMiddleware } from "./middlewares/requestLoggingMiddleware"
import { printRoutes } from './router'
import { setRoutes } from "./routes"

export const multerFunc = multer({ limits: { fileSize: 1000 * 1000 * 5 } }) // 5mb

export const app = express()

export const port = parseInt(process.env.PORT || "4000")

export const frontendPort = parseInt(process.env.FRONTEND_PORT || "3000")

app.use(cookieParser())

app.use(requestLoggingMiddleware)
app.use(express.json())
app.use(cors({ origin: `http://localhost:${frontendPort}` }))

app.use("/docs", express.static(path.join(__dirname, 'docs')))

setRoutes(app)
printRoutes()

app.use(cspMiddleware)
app.use(requestLoggingMiddleware)
app.use(errorHandlingMiddleware)


if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, 'public')))
  app.use("*", (req, res) => res.sendFile(__dirname + "/public/index.html"))
}

export const startServer = () => {
  app.listen(port, () => console.log("Starting server on port " + port))

  return app
}