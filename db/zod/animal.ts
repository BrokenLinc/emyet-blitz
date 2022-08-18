import * as z from "zod"
import { CompletePet, RelatedPetModel } from "./index"

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
   * { "column": true }
   */
  numLegs: z.number().int(),
  /**
   * { "column": true }
   */
  isFurry: z.boolean(),
})

export interface CompleteAnimal extends z.infer<typeof AnimalModel> {
  Pet: CompletePet[]
}

/**
 * RelatedAnimalModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAnimalModel: z.ZodSchema<CompleteAnimal> = z.lazy(() => AnimalModel.extend({
  Pet: RelatedPetModel.array(),
}))
