import * as z from "zod"

export const AnimalModel = z.object({
  /**
   * { "adminMenu": true }
   */
  id: z.number().int(),
  /**
   * { "column": true, "searchable": true }
   */
  name: z.string(),
  /**
   * { "multiline": true, "searchable": true }
   */
  description: z.string(),
  /**
   * { "column": true, "filter": "range" }
   */
  numLegs: z.number().int(),
  /**
   * { "column": true, "filter": "select" }
   */
  isFurry: z.boolean(),
})
