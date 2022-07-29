import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteSkill = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(DeleteSkill), resolver.authorize(), async ({ id }) => {
  const skill = await db.skill.deleteMany({ where: { id } })
  return skill
})
