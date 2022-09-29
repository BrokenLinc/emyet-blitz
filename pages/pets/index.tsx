import React from "react"
import * as UI from "@chakra-ui/react"

import AdminLayout from "app/core/layouts/AdminLayout"
import { AdminSearch } from "app/core/components/admin/AdminComponents"

import {
  modelString,
  modelRouteHelpers,
  modelSchema,
  modelQueries,
} from "app/pets/components/petHelpers"

import { ItemList } from "app/core/components/ItemList"

const PetsPage = () => {
  return (
    <AdminLayout title={modelString.Names}>
      <React.Suspense fallback={<UI.Spinner />}>
        {modelSchema.searchFields.length > 0 ? (
          <AdminSearch searchFields={modelSchema.searchFields} />
        ) : null}
        <ItemList
          modelSchema={modelSchema}
          modelQueries={modelQueries}
          modelRouteHelpers={modelRouteHelpers}
        />
      </React.Suspense>
    </AdminLayout>
  )
}

export default PetsPage
