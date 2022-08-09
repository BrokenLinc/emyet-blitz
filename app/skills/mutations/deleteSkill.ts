import { resolver } from "blitz"

import { table } from "../config"
import validations from "../helpers/validations"

export default resolver.pipe(
  resolver.zod(validations.Delete),
  resolver.authorize(["ADMIN"]),
  async ({ id }) => await table.deleteMany({ where: { id } })
)
