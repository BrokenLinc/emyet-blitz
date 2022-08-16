import { resolver } from "@blitzjs/rpc"
import db from "db"
import { __ModelName__Model } from "db/zod"

const Update__ModelName__ = __ModelName__Model

export default resolver.pipe(
  resolver.zod(Update__ModelName__),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const __modelName__ = await db.__modelName__.update({ where: { id }, data })

    return __modelName__
  }
)
