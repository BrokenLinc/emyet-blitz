import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { FarmModel as Model } from "db/zod"

const table = db.farm
const schema = Model.pick({ id: true })

export default resolver.pipe(resolver.zod(schema), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const item = await table.findFirst({ where: { id } })

  if (!item) throw new NotFoundError()

  return item
})
