import { resolver } from "@blitzjs/rpc"
import db from "db"
import _ from "lodash"
import { PetModel as Model } from "db/zod"

const table = db.pet
const schema = Model

export default resolver.pipe(
  resolver.zod(schema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const nullifiedData = _.reduce(
      data,
      (acc, value, name) => {
        return value === null
          ? { ...acc, [_.trimEnd(name, "Id")]: { disconnect: true } }
          : { ...acc, [name]: value }
      },
      {} as typeof data
    )
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const updatedItem = await table.update({ where: { id }, data: nullifiedData })

    return updatedItem
  }
)
