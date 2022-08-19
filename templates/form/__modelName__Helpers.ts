import { schema } from "app/core/schema"

/**
 * Enums
 */
export enum modelString {
  Name = "__ModelName__",
  Names = "__ModelNames__",
  name = "__modelName__",
  names = "__modelNames__",
  nameId = "__modelName__Id",
}

/**
 * Schema
 */
export const modelSchema = schema.definitions[modelString.Name]

/**
 * Mutations & Queries
 */
import createItem from "app/__modelNames__/mutations/create__ModelName__"
import deleteItem from "app/__modelNames__/mutations/delete__ModelName__"
import updateItem from "app/__modelNames__/mutations/update__ModelName__"
export const modelMutations = { createItem, deleteItem, updateItem }

import getItem from "app/__modelNames__/queries/get__ModelName__"
import getItems from "app/__modelNames__/queries/get__ModelNames__"
export const modelQueries = { getItem, getItems }

/**
 * Validators
 */
import { __ModelName__Model as Model } from "db/zod"
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
