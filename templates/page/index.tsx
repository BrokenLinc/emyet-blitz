import React from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"

import AdminLayout from "app/core/layouts/AdminLayout"
import getItems from "app/animals/queries/getAnimals"
import {
  AdminList,
  AdminListItem,
  Pagination,
  useRouterPage,
} from "app/core/components/admin/AdminComponents"

const ModelNames = "__ModelNames__"
const getShowRoute = (id: number) => Routes.Show__ModelName__Page({ __modelName__Id: id })

const ItemList = () => {
  const page = useRouterPage()
  const [{ items, hasMore }] = usePaginatedQuery(getItems, {
    ...page.queryParams,
    orderBy: { id: "asc" },
  })

  return items.length ? (
    <React.Fragment>
      <AdminList mb={4}>
        {items.map((item) => (
          <Link href={getShowRoute(item.id)} passHref>
            <AdminListItem key={item.id} title={item.name} />
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
      <React.Suspense fallback={<div>Loading...</div>}>
        <ItemList />
      </React.Suspense>
    </AdminLayout>
  )
}

export default __ModelNames__Page
