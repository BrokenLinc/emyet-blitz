import { resolver } from "@blitzjs/rpc"
import db from "db"
import { FarmModel as Model } from "db/zod"

const table = db.farm
const schema = Model.omit({ id: true })

export default resolver.pipe(resolver.zod(schema), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const item = await table.create({ data: input })

  return item
})
