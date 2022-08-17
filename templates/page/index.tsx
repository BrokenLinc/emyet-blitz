import React from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import * as UI from "@chakra-ui/react"

import AdminLayout from "app/core/layouts/AdminLayout"
import getItems from "app/__modelNames__/queries/get__ModelNames__"
import {
  AdminList,
  AdminListItem,
  AdminSearch,
  Pagination,
  useRouterPage,
  useRouterSearch,
} from "app/core/components/admin/AdminComponents"
import getSearchFields from "app/core/getSearchFields"
import { HighlightText } from "app/core/components/admin"

const ModelName = "__ModelName__"
const ModelNames = "__ModelNames__"
const getShowRoute = (id: number) => Routes.Show__ModelName__Page({ __modelName__Id: id })
const searchFields = getSearchFields(__ModelName__)

const ItemList = () => {
  const page = useRouterPage()
  const search = useRouterSearch(searchFields)
  const [{ items, hasMore }] = usePaginatedQuery(getItems, {
    ...page.queryParams,
    where: {
      ...search.queryWhereParams,
    },
    orderBy: { id: "asc" },
  })

  return items.length ? (
    <React.Fragment>
      <AdminList mb={4}>
        {items.map((item) => (
          <Link key={item.id} href={getShowRoute(item.id)} passHref>
            <AdminListItem key={item.id} title={item.name} search={search.value}>
              <HighlightText search={search.value}>{item.description}</HighlightText>
            </AdminListItem>
          </Link>
        ))}
      </AdminList>
      <Pagination hasMore={hasMore} />
    </React.Fragment>
  ) : (
    <React.Fragment>No records found.</React.Fragment>
  )
}

const __ModelNames__Page = () => {
  return (
    <AdminLayout title={ModelNames}>
      <React.Suspense fallback={<UI.Spinner />}>
        {searchFields.length > 0 ? <AdminSearch searchFields={searchFields} /> : null}
        <ItemList />
      </React.Suspense>
    </AdminLayout>
  )
}

export default __ModelNames__Page
