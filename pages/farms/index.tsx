import React from "react"
import * as UI from "@chakra-ui/react"

import AdminLayout from "app/core/layouts/AdminLayout"
import { AdminSearch } from "app/core/components/admin/AdminComponents"

import {
  modelString,
  modelRouteHelpers,
  modelSchema,
  modelQueries,
} from "app/farms/components/farmHelpers"

import { ItemList } from "app/core/components/ItemList"

/*
  This index file has been streamlined to use the ItemList component.
  Pray I do not streamline it further.
 */

const FarmsPage = () => {
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

export default FarmsPage