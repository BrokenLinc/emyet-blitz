import * as z from "zod"
import { CompleteToken, RelatedTokenModel, CompleteSession, RelatedSessionModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().nullish(),
  email: z.string(),
  hashedPassword: z.string().nullish(),
  role: z.string(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  tokens: CompleteToken[]
  sessions: CompleteSession[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  tokens: RelatedTokenModel.array(),
  sessions: RelatedSessionModel.array(),
}))
