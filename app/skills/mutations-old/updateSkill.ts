import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const UpdateSkill = z.object({
  id: z.string(),
  name: z.string().min(1),
  learningscript: z.string(),
  gameid: z.number().int(),
  isdeleted: z.boolean(),
  description: z.string().nullable(),
})

export default resolver.pipe(
  resolver.zod(UpdateSkill),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const skill = await db.skill.update({ where: { id }, data })
    return skill
  }
)
