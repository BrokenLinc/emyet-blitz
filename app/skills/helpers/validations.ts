import { z } from "zod"

import { id, idParams, optionalParams, requiredParams } from "../config"

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
