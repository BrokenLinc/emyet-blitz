/**
 * Enums
 */
export enum modelString {
  Name = "Pet",
  Names = "Pets",
  name = "pet",
  names = "pets",
  nameId = "petId",
}

/**
 * Schema
 */
import getColumnFields from "app/core/getColumnFields"
import getSearchFields from "app/core/getSearchFields"
export const modelSchema = {
  columns: getColumnFields(modelString.Name),
  searchFields: getSearchFields(modelString.Name),
}

/**
 * Mutations & Queries
 */
import createItem from "app/pets/mutations/createPet"
import deleteItem from "app/pets/mutations/deletePet"
import updateItem from "app/pets/mutations/updatePet"
export const modelMutations = { createItem, deleteItem, updateItem }

import getItem from "app/pets/queries/getPet"
import getItems from "app/pets/queries/getPets"
export const modelQueries = { getItem, getItems }

/**
 * Validators
 */
import { PetModel as Model } from "db/zod"
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
