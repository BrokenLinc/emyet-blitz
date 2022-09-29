import React from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import * as UI from "@chakra-ui/react"
import _ from "lodash"

import AdminLayout from "app/core/layouts/AdminLayout"
import {
  AdminSearch,
  Pagination,
  useRouterPage,
  useRouterSearch,
} from "app/core/components/admin/AdminComponents"
import { HighlightText } from "app/core/components/admin"
import { getItemLabel } from "app/core/getItemLabel"
import { getModelReferenceColumns } from "app/core/getModelReferenceColumns"

import {
  modelString,
  modelRouteHelpers,
  modelSchema,
  modelMutations,
  modelQueries,
  modelValidators,
} from "app/pet-on-farms/components/petOnFarmHelpers"

const ItemList = () => {
  const page = useRouterPage()
  const search = useRouterSearch(modelSchema.searchFields)
  const [{ items, hasMore }] = usePaginatedQuery(modelQueries.getItems, {
    ...page.queryParams,
    where: {
      ...search.queryWhereParams,
    },
    include: getModelReferenceColumns(modelSchema),
    orderBy: { id: "asc" },
  })

  return items.length ? (
    <React.Fragment>
      <UI.Box p={2} border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
        <UI.TableContainer>
          <UI.Table variant="simple">
            <UI.Thead>
              <UI.Tr>
                {modelSchema.columns.map((column) => (
                  <UI.Th key={column.key}>{column.label}</UI.Th>
                ))}
                <UI.Th />
              </UI.Tr>
            </UI.Thead>
            <UI.Tbody>
              {items.map((item) => (
                <UI.Tr key={item.id}>
                  {_.map(modelSchema.columns, (column) => {
                    const label = getItemLabel(item[column.key])
                    return (
                      <UI.Td key={column.key}>
                        {column.meta.searchable ? (
                          <HighlightText search={search.value}>{label}</HighlightText>
                        ) : (
                          <React.Fragment>{label}</React.Fragment>
                        )}
                      </UI.Td>
                    )
                  })}
                  <UI.Td>
                    <UI.HStack spacing={2} justifyContent="end">
                      <Link href={modelRouteHelpers.getShowRoute(item.id)} passHref>
                        <UI.Link>Details</UI.Link>
                      </Link>
                      <UI.Text color="gray.300">|</UI.Text>
                      <Link href={modelRouteHelpers.getEditRoute(item.id)} passHref>
                        <UI.Link>Edit</UI.Link>
                      </Link>
                    </UI.HStack>
                  </UI.Td>
                </UI.Tr>
              ))}
            </UI.Tbody>
            <UI.Tfoot>
              <UI.Tr>
                {_.map(modelSchema.columns, (column) => (
                  <UI.Th key={column.key}>{column.label}</UI.Th>
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

const PetOnFarmsPage = () => {
  return (
    <AdminLayout title={modelString.Names}>
      <React.Suspense fallback={<UI.Spinner />}>
        {modelSchema.searchFields.length > 0 ? (
          <AdminSearch searchFields={modelSchema.searchFields} mb={4} />
        ) : null}
        <ItemList />
      </React.Suspense>
    </AdminLayout>
  )
}

export default PetOnFarmsPage
