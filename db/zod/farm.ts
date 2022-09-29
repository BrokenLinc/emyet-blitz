import * as z from "zod"
import { CompletePetOnFarm, RelatedPetOnFarmModel } from "./index"

export const FarmModel = z.object({
  /**
   * { "adminMenu": true }
   */
  id: z.number().int(),
  /**
   * { "column": true, "searchable": true }
   */
  name: z.string(),
})

export interface CompleteFarm extends z.infer<typeof FarmModel> {
  Pets: CompletePetOnFarm[]
}

/**
 * RelatedFarmModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFarmModel: z.ZodSchema<CompleteFarm> = z.lazy(() => FarmModel.extend({
  Pets: RelatedPetOnFarmModel.array(),
}))
