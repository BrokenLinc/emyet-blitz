import React from "react"
import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"

import AdminLayout from "app/core/layouts/AdminLayout"

import {
  modelString,
  modelRouteHelpers,
  modelSchema,
  modelMutations,
  modelQueries,
  modelValidators,
} from "app/pets/components/petHelpers"
import ItemForm, { FORM_ERROR } from "app/pets/components/PetForm"

export const EditItem = () => {
  const router = useRouter()
  const itemId = useParam(modelString.nameId, "number") || 0
  const [item, { setQueryData }] = useQuery(
    modelQueries.getItem,
    { id: itemId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateItemMutation] = useMutation(modelMutations.updateItem)

  return (
    <ItemForm
      submitText={`Update ${modelString.Name}`}
      schema={modelValidators.update}
      initialValues={item}
      onSubmit={async (values) => {
        try {
          const updatedItem = await updateItemMutation({
            id: item.id,
            ...values,
          })
          await setQueryData(updatedItem)
          router.push(modelRouteHelpers.getShowRoute(updatedItem.id))
        } catch (error: any) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
    />
  )
}

const EditPetPage = () => {
  return (
    <AdminLayout title={`Edit ${modelString.Name}`}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <EditItem />
      </React.Suspense>
    </AdminLayout>
  )
}

EditPetPage.authenticate = true

export default EditPetPage
