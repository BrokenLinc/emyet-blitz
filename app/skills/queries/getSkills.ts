import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSkillsInput
  extends Pick<Prisma.skillFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSkillsInput) => {
    const {
      items: skills,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.skill.count({ where }),
      query: (paginateArgs) => db.skill.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      skills,
      nextPage,
      hasMore,
      count,
    }
  }
)
