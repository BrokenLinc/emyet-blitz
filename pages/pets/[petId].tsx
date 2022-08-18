import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import * as UI from "@chakra-ui/react"

import AdminLayout from "app/core/layouts/AdminLayout"

import {
  modelString,
  modelRouteHelpers,
  modelSchema,
  modelMutations,
  modelQueries,
  modelValidators,
} from "app/pets/components/petHelpers"

export const ItemDetails = () => {
  const router = useRouter()
  const itemId = useParam(modelString.nameId, "number") || 0
  const [deleteItemMutation] = useMutation(modelMutations.deleteItem)
  const [item] = useQuery(modelQueries.getItem, { id: itemId })

  return (
    <>
      <UI.Code p={4} mb={6} borderRadius="md" shadow="inner">
        {JSON.stringify(item, null, 2)}
      </UI.Code>

      <UI.HStack>
        <Link href={modelRouteHelpers.getEditRoute(item.id)} passHref>
          <UI.Button>Edit</UI.Button>
        </Link>

        <UI.Button
          colorScheme="red"
          variant="outline"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteItemMutation({ id: item.id })
              router.push(modelRouteHelpers.getIndexRoute())
            }
          }}
        >
          Delete
        </UI.Button>
      </UI.HStack>
    </>
  )
}

const ShowPetPage = () => {
  return (
    <AdminLayout title={`${modelString.Name} Details`}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ItemDetails />
      </React.Suspense>
    </AdminLayout>
  )
}

ShowPetPage.authenticate = true

export default ShowPetPage
