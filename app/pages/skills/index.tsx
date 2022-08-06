import React from "react"
import { Link, usePaginatedQuery, BlitzPage, Routes } from "blitz"
import * as UI from "@chakra-ui/react"

import getSkills from "app/skills/queries/getSkills"
import { AdminLayout } from "app/core/layouts/AdminLayout"
import { AdminOnly } from "app/components/AdminOnly"
import {
  AdminDeletedToggle,
  AdminList,
  AdminListItem,
  AdminSearch,
  HighlightText,
  Pagination,
  useRouterDeleted,
  useRouterPage,
  useRouterSearch,
} from "app/core/components/AdminComponents"

export const SkillsList = () => {
  const searchFields = ["name", "description"]
  const search = useRouterSearch(searchFields)
  const isDeleted = useRouterDeleted()
  const page = useRouterPage()
  const [{ skills, hasMore }] = usePaginatedQuery(getSkills, {
    where: {
      ...search.queryWhereParams,
      isDeleted: isDeleted.value,
    },
    ...page.queryParams,
    orderBy: { name: "asc" },
  })

  return (
    <UI.VStack spacing={4} alignItems="stretch">
      <UI.HStack>
        <AdminSearch maxW="380px" searchFields={searchFields} />
        <AdminDeletedToggle />
      </UI.HStack>
      <AdminList>
        {skills.map((skill) => (
          <Link key={skill.id} href={Routes.EditSkillPage({ skillId: skill.id })} passHref>
            <AdminListItem title={skill.name} isDeleted={skill.isDeleted} search={search.value}>
              <HighlightText search={search.value}>{skill.description}</HighlightText>
            </AdminListItem>
          </Link>
        ))}
      </AdminList>
      <Pagination hasMore={hasMore} />
    </UI.VStack>
  )
}

const SkillsPage: BlitzPage = () => {
  return (
    <AdminOnly>
      <UI.Heading mb={6}>Skills</UI.Heading>
      <React.Suspense fallback={<UI.Spinner />}>
        <SkillsList />
      </React.Suspense>
    </AdminOnly>
  )
}

SkillsPage.authenticate = true
SkillsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default SkillsPage
