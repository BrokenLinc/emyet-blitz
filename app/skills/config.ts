import { z } from "zod"
import db, { Prisma } from "db"

import { castedInt, castedBoolean } from "app/core/helpers/validation"

// schema
export type FindManyArgs = Prisma.SkillFindManyArgs
export const table = db.skill
export const recordsName = "skills"

// validations
export const id = z.string()
export const idParams = z.object({
  id,
})
export const requiredParams = z.object({
  name: z.string().min(1),
  learningScript: z.string(),
  gameId: castedInt(0),
  isDeleted: castedBoolean(false),
})
export const optionalParams = z
  .object({
    description: z.string().nullable(),
  })
  .partial()
