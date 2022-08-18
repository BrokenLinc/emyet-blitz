/**
 * Enums
 */
export enum modelString {
  Name = "Animal",
  Names = "Animals",
  name = "animal",
  names = "animals",
  nameId = "animalId",
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
import createItem from "app/animals/mutations/createAnimal"
import deleteItem from "app/animals/mutations/deleteAnimal"
import updateItem from "app/animals/mutations/updateAnimal"
export const modelMutations = { createItem, deleteItem, updateItem }

import getItem from "app/animals/queries/getAnimal"
import getItems from "app/animals/queries/getAnimals"
export const modelQueries = { getItem, getItems }

/**
 * Validators
 */
import { AnimalModel as Model } from "db/zod"
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
