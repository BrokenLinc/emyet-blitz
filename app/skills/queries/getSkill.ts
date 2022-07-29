import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetSkill = z.object({
  // This accepts type of undefined, but is required at runtime
  // So this will pass TS validation as optional, but when executed, it will require the value
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetSkill), resolver.authorize(), async ({ id }) => {
  const skill = await db.skill.findFirst({ where: { id } })

  if (!skill) throw new NotFoundError()

  return skill
})
