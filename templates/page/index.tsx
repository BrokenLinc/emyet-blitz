import React from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import * as UI from "@chakra-ui/react"
import _ from "lodash"

import AdminLayout from "app/core/layouts/AdminLayout"
import getSearchFields from "app/core/getSearchFields"
import { HighlightText } from "app/core/components/admin"
import getColumnFields from "app/core/getColumnFields"
import {
  AdminSearch,
  Pagination,
  useRouterPage,
  useRouterSearch,
} from "app/core/components/admin/AdminComponents"
import getItems from "app/__modelNames__/queries/get__ModelNames__"

const modelName = "__modelName__"
const ModelName = "__ModelName__"
const ModelNames = "__ModelNames__"

const getShowRoute = (id: number) => Routes.Show__ModelName__Page({ [`${modelName}Id`]: id })
const getEditRoute = (id: number) => Routes.Edit__ModelName__Page({ [`${modelName}Id`]: id })
const searchFields = getSearchFields(ModelName)
const columns = getColumnFields(ModelName)

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
      <UI.Box p={2} border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
        <UI.TableContainer>
          <UI.Table variant="simple">
            <UI.Thead>
              <UI.Tr>
                {columns.map((column) => (
                  <UI.Th key={column}>{_.startCase(column)}</UI.Th>
                ))}
              </UI.Tr>
            </UI.Thead>
            <UI.Tbody>
              {items.map((item) => (
                <UI.Tr key={item.id}>
                  {columns.map((column) => (
                    <UI.Td key={column}>
                      <HighlightText search={search.value}>{item[column]}</HighlightText>
                    </UI.Td>
                  ))}
                  <UI.Td>
                    <UI.HStack spacing={2}>
                      <Link href={getShowRoute(item.id)} passHref>
                        <UI.Link>Details</UI.Link>
                      </Link>
                      <UI.Text color="gray.300">|</UI.Text>
                      <Link href={getEditRoute(item.id)} passHref>
                        <UI.Link>Edit</UI.Link>
                      </Link>
                    </UI.HStack>
                  </UI.Td>
                </UI.Tr>
              ))}
            </UI.Tbody>
            <UI.Tfoot>
              <UI.Tr>
                {columns.map((column) => (
                  <UI.Th key={column}>{_.startCase(column)}</UI.Th>
                ))}
              </UI.Tr>
            </UI.Tfoot>
          </UI.Table>
        </UI.TableContainer>
      </UI.Box>
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
        {searchFields.length > 0 ? <AdminSearch searchFields={searchFields} mb={4} /> : null}
        <ItemList />
      </React.Suspense>
    </AdminLayout>
  )
}

export default __ModelNames__Page
