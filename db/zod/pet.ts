import * as z from "zod"
import { CompleteAnimal, RelatedAnimalModel, CompletePetOnFarm, RelatedPetOnFarmModel } from "./index"

export const PetModel = z.object({
  /**
   * { "adminMenu": true }
   */
  id: z.number().int(),
  /**
   * { "column": true, "searchable": true }
   */
  name: z.string(),
  /**
   * { "relation": "animal" }
   */
  animalId: z.number().int().nullish(),
})

export interface CompletePet extends z.infer<typeof PetModel> {
  animal?: CompleteAnimal | null
  Farms: CompletePetOnFarm[]
}

/**
 * RelatedPetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPetModel: z.ZodSchema<CompletePet> = z.lazy(() => PetModel.extend({
  /**
   * { "column": true }
   */
  animal: RelatedAnimalModel.nullish(),
  Farms: RelatedPetOnFarmModel.array(),
}))
