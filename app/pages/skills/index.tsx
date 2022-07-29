import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSkills from "app/skills/queries/getSkills"

const ITEMS_PER_PAGE = 100

export const SkillsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ skills, hasMore }] = usePaginatedQuery(getSkills, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
            <Link href={Routes.ShowSkillPage({ skillId: skill.id })}>
              <a>{skill.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const SkillsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Skills</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewSkillPage()}>
            <a>Create Skill</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SkillsList />
        </Suspense>
      </div>
    </>
  )
}

SkillsPage.authenticate = true
SkillsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SkillsPage
