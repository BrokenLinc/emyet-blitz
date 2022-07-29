import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateSkill = z.object({
  name: z.string().min(1),
  learningscript: z.string(),
  gameid: z.number().int(),
  isdeleted: z.boolean(),
  description: z.string(),
})

export default resolver.pipe(resolver.zod(CreateSkill), resolver.authorize(), async (input) => {
  const skill = await db.skill.create({ data: input })
  return skill
})
