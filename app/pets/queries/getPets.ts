import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

const table = db.pet
type FindManyArgs = Prisma.PetFindManyArgs

interface GetItemInput
  extends Pick<FindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, skip = 0, take = 100, ...restInput }: GetItemInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => table.count({ where }),
      query: (paginateArgs) => table.findMany({ ...paginateArgs, where, ...restInput }),
    })

    return {
      items,
      nextPage,
      hasMore,
      count,
    }
  }
)
