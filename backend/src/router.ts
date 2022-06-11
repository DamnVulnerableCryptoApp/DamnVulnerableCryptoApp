import { Request, Response } from "express"

// This logic allows us to use instantiated controllers (extended from BaseController)
// Also calls an async beforeActionValidation method and waits for it to finish before calling the actual endpoint function :)

type ExpressMethod = "get" | "post" | "patch" | "put" | "delete" | "options" | "head" | "trace" | "all" | "render"

export const routes: any = []

export const initRouter = (app: any) => {
  const route = async (method: ExpressMethod, path: string, ...args: any[]) => {
    const controller = args.shift()
    const action = args.shift()

    routes.push({ method, path, controller: controller.name, action })

    app[method](path, ...args, async (req: Request, res: Response) => {
      try {
        const instance = Object.create(controller.prototype)
        instance.constructor.apply(instance, [req, res, action])

        // we can use validations and if doesn't pass here move forward
        const success = await instance.beforeAction()

        let r = undefined
        if (success) r = await instance[action]() // call the actual endpoint method

        // fallback in case the action method doesn't return a reply. Use the return value of the method and send it in the response
        if (!res.headersSent) res.send(r)
      }
      catch (ex) {
        // this should only be done with the vuln app :)
        res.status(500).send(ex)
      }
    })
  }

  const get = (path: string, ...args: any[]) => route("get", path, ...args)
  const post = (path: string, ...args: any[]) => route("post", path, ...args)
  const patch = (path: string, ...args: any[]) => route("patch", path, ...args)
  const put = (path: string, ...args: any[]) => route("put", path, ...args)
  const del = (path: string, ...args: any[]) => route("delete", path, ...args)
  const options = (path: string, ...args: any[]) => route("options", path, ...args)
  const head = (path: string, ...args: any[]) => route("head", path, ...args)
  const trace = (path: string, ...args: any[]) => route("trace", path, ...args)
  const all = (path: string, ...args: any[]) => route("all", path, ...args)
  const render = (path: string, ...args: any[]) => route("render", path, ...args)

  return { get, post, patch, put, del, options, head, trace, all, render }
}

// TODO: replace this by a routine that prints all routes defined in express
export const printRoutes = () => {
  console.table(routes)
}
