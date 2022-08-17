import React from "react"
import { Routes, useParam } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"

import AdminLayout from "app/core/layouts/AdminLayout"
import getItem from "app/animals/queries/getAnimal"
import updateItem from "app/animals/mutations/updateAnimal"
import ItemForm, { FORM_ERROR } from "app/animals/components/AnimalForm"
import { AnimalModel as Model } from "db/zod"

const ModelName = "__ModelName__"
const modelNameId = "__modelName__Id"
const schema = Model.omit({ id: true })
const getShowPage = (id: number) => Routes.Show__ModelName__Page({ [modelNameId]: id })

export const EditItem = () => {
  const router = useRouter()
  const itemId = useParam(modelNameId, "number") || 0
  const [item, { setQueryData }] = useQuery(
    getItem,
    { id: itemId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateItemMutation] = useMutation(updateItem)

  return (
    <ItemForm
      submitText={`Update ${ModelName}`}
      schema={schema}
      initialValues={item}
      onSubmit={async (values) => {
        try {
          const updatedItem = await updateItemMutation({
            id: item.id,
            ...values,
          })
          await setQueryData(updatedItem)
          router.push(getShowPage(updatedItem.id))
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

const Edit__ModelName__Page = () => {
  return (
    <AdminLayout title={`Edit ${ModelName}`}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <EditItem />
      </React.Suspense>
    </AdminLayout>
  )
}

Edit__ModelName__Page.authenticate = true

export default Edit__ModelName__Page
