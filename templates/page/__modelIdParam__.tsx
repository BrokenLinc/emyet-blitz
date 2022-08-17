import React from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import * as UI from "@chakra-ui/react"

import AdminLayout from "app/core/layouts/AdminLayout"
import getItem from "app/animals/queries/getAnimal"
import deleteItem from "app/animals/mutations/deleteAnimal"

const ModelName = "__ModelName__"
const modelNameId = "__modelNames__Id"
const getIndexRoute = () => Routes.__ModelNames__Page()
const getEditRoute = (id: string) => Routes.Edit__ModelName__Page({ [modelNameId]: id })

export const ItemDetails = () => {
  const router = useRouter()
  const itemId = useParam(modelNameId, "number") || 0
  const [deleteItemMutation] = useMutation(deleteItem)
  const [item] = useQuery(getItem, { id: itemId })

  return (
    <>
      <UI.Code p={4} mb={6} borderRadius="md" shadow="inner">
        {JSON.stringify(item, null, 2)}
      </UI.Code>

      <UI.HStack>
        <Link href={getEditRoute(item.id)} passHref>
          <UI.Button>Edit</UI.Button>
        </Link>

        <UI.Button
          colorScheme="red"
          variant="outline"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteItemMutation({ id: item.id })
              router.push(getIndexRoute())
            }
          }}
        >
          Delete
        </UI.Button>
      </UI.HStack>
    </>
  )
}

const Show__ModalName__Page = () => {
  return (
    <AdminLayout title={`${ModelName} Details`}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ItemDetails />
      </React.Suspense>
    </AdminLayout>
  )
}

Show__ModalName__Page.authenticate = true

export default Show__ModalName__Page
