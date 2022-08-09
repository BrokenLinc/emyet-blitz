import { resolver } from "blitz"

import { table } from "../config"
import validations from "../helpers/validations"

export default resolver.pipe(
  resolver.zod(validations.Create),
  resolver.authorize(["ADMIN"]),
  async (data) => await table.create({ data })
)
