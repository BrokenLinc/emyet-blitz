import { NotFoundError, resolver } from "blitz"

import { table } from "../config"
import validations from "../helpers/validations"

export default resolver.pipe(
  resolver.zod(validations.Get),
  resolver.authorize(["ADMIN", "USER"]),
  async ({ id }) => {
    const item = await table.findFirst({ where: { id } })

    if (!item) throw new NotFoundError()

    return item
  }
)
