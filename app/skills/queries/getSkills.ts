import { paginate, resolver } from "blitz"

import { FindManyArgs, recordsName, table } from "../config"

export interface GetManyInput extends Pick<FindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(["ADMIN", "USER"]),
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
