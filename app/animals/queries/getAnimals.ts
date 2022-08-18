import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

const table = db.animal
type FindManyArgs = Prisma.AnimalFindManyArgs

interface GetItemInput extends Pick<FindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetItemInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => table.count({ where }),
      query: (paginateArgs) => table.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      items,
      nextPage,
      hasMore,
      count,
    }
  }
)
