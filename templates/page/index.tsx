import React from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"

import AdminLayout from "app/core/layouts/AdminLayout"
import get__ModelNames__ from "app/__modelNames__/queries/get__ModelNames__"
import {
  AdminList,
  AdminListItem,
  Pagination,
  useRouterPage,
} from "app/core/components/admin/AdminComponents"

export const __ModelNames__List = () => {
  const page = useRouterPage()
  const [{ __modelNames__, hasMore }] = usePaginatedQuery(get__ModelNames__, {
    ...page.queryParams,
    orderBy: { id: "asc" },
  })

  return __modelNames__.length ? (
    <React.Fragment>
      <AdminList mb={4}>
        {__modelNames__.map((__modelName__) => (
          <Link href={Routes.Show__ModelName__Page({ __modelName__Id: __modelName__.id })} passHref>
            <AdminListItem key={__modelName__.id} title={__modelName__.name} />
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
    <AdminLayout title="__ModelNames__">
      <React.Suspense fallback={<div>Loading...</div>}>
        <__ModelNames__List />
      </React.Suspense>
    </AdminLayout>
  )
}

export default __ModelNames__Page
