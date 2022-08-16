import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { __ModelName__Model } from "db/zod"

const CreateAnimal = __ModelName__Model.omit({ id: true })

if (process.env.parentModel) {
  const Create__ModelName__ = __ModelName__Model.extend({ __parentModelId__: z.number() })
} else {
  const Create__ModelName__ = __ModelName__Model.omit({ id: true })
}

export default resolver.pipe(
  resolver.zod(Create__ModelName__),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const __modelName__ = await db.__modelName__.create({ data: input })

    return __modelName__
  }
)
