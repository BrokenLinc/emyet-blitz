import { resolver } from "blitz"

import { table } from "../config"
import validations from "../helpers/validations"

export default resolver.pipe(
  resolver.zod(validations.Update),
  resolver.authorize(["ADMIN"]),
  async ({ id, ...data }) => await table.update({ where: { id }, data })
)
