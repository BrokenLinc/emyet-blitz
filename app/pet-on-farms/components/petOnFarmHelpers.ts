import { schema } from "app/core/schema"

/**
 * Enums
 */
export enum modelString {
  Name = "PetOnFarm",
  Names = "PetOnFarms",
  name = "petOnFarm",
  names = "petOnFarms",
  nameId = "petOnFarmId",
}

/**
 * Schema
 */
export const modelSchema = schema.definitions[modelString.Name]

/**
 * Mutations & Queries
 */
import createItem from "app/pet-on-farms/mutations/createPetOnFarm"
import deleteItem from "app/pet-on-farms/mutations/deletePetOnFarm"
import updateItem from "app/pet-on-farms/mutations/updatePetOnFarm"
export const modelMutations = { createItem, deleteItem, updateItem }

import getItem from "app/pet-on-farms/queries/getPetOnFarm"
import getItems from "app/pet-on-farms/queries/getPetOnFarms"
export const modelQueries = { getItem, getItems }

/**
 * Validators
 */
import { PetOnFarmModel as Model } from "db/zod"
export const modelValidators = {
  create: Model.omit({ id: true }),
  update: Model.omit({ id: true }),
  delete: Model.pick({ id: true }),
}

/**
 * Routes
 */
import { Routes } from "@blitzjs/next"
export const modelRouteHelpers = {
  getEditRoute: (id: number) => Routes[`Edit${modelString.Name}Page`]({ [modelString.nameId]: id }),
  getIndexRoute: () => Routes[`${modelString.Name}Page`](),
  getShowRoute: (id: number) => Routes[`Show${modelString.Name}Page`]({ [modelString.nameId]: id }),
}
