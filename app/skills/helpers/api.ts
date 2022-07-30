import { paginate, resolver, NotFoundError } from "blitz"
import db, { Prisma } from "db"
import { z } from "zod"

// Table specific code

type FindManyArgs = Prisma.skillFindManyArgs
const recordsName = "skills"
const table = db.skill

const id = z.string()
const idParams = z.object({
  id,
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
export const Get = z.object({
  // This accepts type of undefined, but is required at runtime
  id: id.optional().refine(Boolean, "Required"),
})
export interface GetManyInput extends Pick<FindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

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

export const get = resolver.pipe(resolver.zod(Get), resolver.authorize(), async ({ id }) => {
  const item = await table.findFirst({ where: { id } })

  if (!item) throw new NotFoundError()

  return item
})

export const getMany = resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetManyInput) => {
    const { items, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => table.count({ where }),
      query: (paginateArgs) => table.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      [recordsName]: items,
      nextPage,
      hasMore,
      count,
    }
  }
)

export default {
  Create,
  Delete,
  Update,
  Get,
  create,
  _delete,
  update,
  get,
  getMany,
}
