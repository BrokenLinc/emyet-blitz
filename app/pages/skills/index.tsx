import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import * as UI from "@chakra-ui/react"

import getSkills from "app/skills/queries/getSkills"
import { AdminLayout } from "app/core/layouts/AdminLayout"
import { AdminOnly } from "app/components/AdminOnly"
import React from "react"
import _ from "lodash"

const ITEMS_PER_PAGE = 50

const useRouterPage = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const goToPreviousPage = () => router.push({ query: { ...router.query, page: page - 1 } })
  const goToNextPage = () => router.push({ query: { ...router.query, page: page + 1 } })
  return {
    current: page,
    isFirst: page === 0,
    prev: goToPreviousPage,
    next: goToNextPage,
  }
}

const useRouterBoolean = (paramName: string) => {
  const router = useRouter()
  const value = router.query[paramName] === "true"
  const toggle = () => router.push({ query: { ...router.query, [paramName]: !value } })
  return {
    value,
    toggle,
  }
}

const useRouterString = (paramName: string) => {
  const router = useRouter()
  const value = _.flatten([router.query[paramName]])[0] || ""
  const set = (newValue: string) =>
    router.push({ query: { ...router.query, [paramName]: newValue } })
  return {
    value,
    set,
  }
}

export const SkillsList = () => {
  const isdeleted = useRouterBoolean("isdeleted")
  const page = useRouterPage()
  const search = useRouterString("search")
  const [{ skills, hasMore }] = usePaginatedQuery(getSkills, {
    orderBy: { name: "asc" },
    skip: ITEMS_PER_PAGE * page.current,
    take: ITEMS_PER_PAGE,
    where: {
      isdeleted: isdeleted.value,
      OR: [{ name: { contains: search.value, mode: "insensitive" } }],
    },
  })

  return (
    <UI.VStack spacing={4} alignItems="start">
      <UI.Button onClick={isdeleted.toggle}>Del</UI.Button>
      <UI.SimpleGrid minChildWidth="280px" spacing={4}>
        {skills.map((skill) => (
          <Link key={skill.id} href={Routes.EditSkillPage({ skillId: skill.id })} passHref>
            <UI.VStack
              as="a"
              alignItems="start"
              color={skill.isdeleted ? "red" : ""}
              bg="gray.50"
              border="2px solid transparent"
              borderRadius="md"
              _hover={{ borderColor: "blue.500" }}
              p={4}
              pt={3}
            >
              <UI.Text fontWeight="500">{skill.name || "-Untitled-"}</UI.Text>
              <UI.Text fontSize="sm" color="gray.500">
                {skill.description}
              </UI.Text>
            </UI.VStack>
          </Link>
        ))}
      </UI.SimpleGrid>

      <UI.ButtonGroup size="sm" isAttached variant="outline">
        <UI.Button isDisabled={page.isFirst} onClick={page.prev}>
          Previous
        </UI.Button>
        <UI.Button isDisabled={!hasMore} onClick={page.next}>
          Next
        </UI.Button>
      </UI.ButtonGroup>
    </UI.VStack>
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
