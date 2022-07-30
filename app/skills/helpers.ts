import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

// Table specific code

const table = db.skill

const idParams = z.object({
  id: z.string(),
})

const requiredParams = z.object({
  name: z.string().min(1),
  learningscript: z.string(),
  gameid: z.number().int(),
  isdeleted: z.boolean(),
})

const optionalParams = z
  .object({
    description: z.string().nullable(),
  })
  .partial()

// Generic code

export const Create = z.object({}).merge(requiredParams).merge(optionalParams)
export const Delete = idParams
export const Update = z
  .object({})
  .merge(idParams)
  .merge(requiredParams.partial())
  .merge(optionalParams)

export const create = resolver.pipe(
  resolver.zod(Create),
  resolver.authorize(),
  async (data) => await table.create({ data })
)

export const _delete = resolver.pipe(
  resolver.zod(Delete),
  resolver.authorize(),
  async ({ id }) => await table.deleteMany({ where: { id } })
)

export const update = resolver.pipe(
  resolver.zod(Update),
  resolver.authorize(),
  async ({ id, ...data }) => await table.update({ where: { id }, data })
)

export default {
  Create,
  Delete,
  Update,
  create,
  _delete,
  update,
}
