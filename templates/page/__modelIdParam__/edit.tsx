import React from "react"
import { Routes, useParam } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"

import AdminLayout from "app/core/layouts/AdminLayout"
import get__ModelName__ from "app/__modelNames__/queries/get__ModelName__"
import update__ModelName__ from "app/__modelNames__/mutations/update__ModelName__"
import { __ModelName__Form, FORM_ERROR } from "app/__modelNames__/components/__ModelName__Form"
import { __ModelName__Model } from "db/zod"

const Update__ModelName__ = __ModelName__Model.omit({ id: true })

export const Edit__ModelName__ = () => {
  const router = useRouter()
  const __modelNameId = useParam("__modelNameId", "number") || 0
  if (process.env.parentModel) {
    const __parentModelId__ = useParam("__parentModelId__", "number")
  }
  const [__modelName, { setQueryData }] = useQuery(
    get__ModelName__,
    { id: __modelName__Id },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [update__ModelNameMutation] = useMutation(update__ModelName)

  return (
    <__ModelNameForm
      submitText="Update __ModelName"
      schema={Update__ModelName}
      initialValues={__modelName__}
      onSubmit={async (values) => {
        try {
          const updated = await update__ModelName__Mutation({
            id: __modelName__.id,
            ...values,
          })
          await setQueryData(updated)
          router.push(
            process.env.parentModel
              ? Routes.Show__ModelName__Page({
                  __parentModelId__: __parentModelId__!,
                  __modelId__: updated.id,
                })
              : Routes.Show__ModelName__Page({ __modelId__: updated.id })
          )
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

const Edit__ModelNamePage = () => {
  return (
    <AdminLayout title="Edit __ModelName">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Edit__ModelName />
      </React.Suspense>
    </AdminLayout>
  )
}

Edit__ModelNamePage.authenticate = true

export default Edit__ModelNamePage
