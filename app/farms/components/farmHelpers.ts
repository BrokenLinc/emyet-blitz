import { schema } from "app/core/schema"

/**
 * Enums
 */
export enum modelString {
  Name = "Farm",
  Names = "Farms",
  name = "farm",
  names = "farms",
  nameId = "farmId",
}

/**
 * Schema
 */
export const modelSchema = schema.definitions[modelString.Name]

/**
 * Mutations & Queries
 */
import createItem from "app/farms/mutations/createFarm"
import deleteItem from "app/farms/mutations/deleteFarm"
import updateItem from "app/farms/mutations/updateFarm"
export const modelMutations = { createItem, deleteItem, updateItem }

import getItem from "app/farms/queries/getFarm"
import getItems from "app/farms/queries/getFarms"
export const modelQueries = { getItem, getItems }

/**
 * Validators
 */
import { FarmModel as Model } from "db/zod"
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
