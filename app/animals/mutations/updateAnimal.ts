import { resolver } from "@blitzjs/rpc"
import db from "db"
import { AnimalModel as Model } from "db/zod"

const table = db.animal
const schema = Model

export default resolver.pipe(
  resolver.zod(schema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const updatedItem = await table.update({ where: { id }, data })

    return updatedItem
  }
)
