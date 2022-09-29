import * as z from "zod"
import { CompletePet, RelatedPetModel, CompleteFarm, RelatedFarmModel } from "./index"

export const PetOnFarmModel = z.object({
  /**
   * { "adminMenu": true, "column": true }
   */
  id: z.number().int(),
  /**
   * { "relation": "pet" }
   */
  petId: z.number().int(),
  /**
   * { "relation": "farm" }
   */
  farmId: z.number().int(),
})

export interface CompletePetOnFarm extends z.infer<typeof PetOnFarmModel> {
  pet: CompletePet
  farm: CompleteFarm
}

/**
 * RelatedPetOnFarmModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPetOnFarmModel: z.ZodSchema<CompletePetOnFarm> = z.lazy(() => PetOnFarmModel.extend({
  /**
   * { "column": true }
   */
  pet: RelatedPetModel,
  /**
   * { "column": true }
   */
  farm: RelatedFarmModel,
}))
