import { z } from "zod"

import { castedInt, castedBoolean } from "app/core/helpers/validation"

/*
 * Table specific code
 */

const id = z.string()
const idParams = z.object({
  id,
})

const requiredParams = z.object({
  name: z.string().min(1),
  learningscript: z.string(),
  gameid: castedInt(0),
  isdeleted: castedBoolean(false),
})

const optionalParams = z
  .object({
    description: z.string().nullable(),
  })
  .partial()

/*
 * Generic code
 */

export const Create = z.object({}).merge(requiredParams).merge(optionalParams)
export const Delete = idParams
export const Update = z
  .object({})
  .merge(idParams)
  .merge(requiredParams.partial())
  .merge(optionalParams)
export const Get = z.object({
  // This accepts type of undefined, but is required at runtime
  id: id.optional().refine(Boolean, "Required"),
})

export default {
  Create,
  Delete,
  Update,
  Get,
}
