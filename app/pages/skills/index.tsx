import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import * as UI from "@chakra-ui/react"

import getSkills from "app/skills/queries/getSkills"
import { AdminLayout } from "app/core/layouts/AdminLayout"
import { AdminOnly } from "app/components/AdminOnly"

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
    <AdminOnly>
      <UI.Heading mb={6}>Skills</UI.Heading>
      <Suspense fallback={<div>Loading...</div>}>
        <SkillsList />
      </Suspense>
    </AdminOnly>
  )
}

SkillsPage.authenticate = true
SkillsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default SkillsPage
