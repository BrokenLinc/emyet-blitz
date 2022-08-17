import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
if (process.env.parentModel) {
  import { useParam } from "@blitzjs/next"
}

import AdminLayout from "app/core/layouts/AdminLayout"
import create__ModelName__ from "app/__modelNames__/mutations/create__ModelName__"
import { __ModelName__Form, FORM_ERROR } from "app/__modelNames__/components/__ModelName__Form"
import { __ModelName__Model } from "db/zod"

const Create__ModelName__ = __ModelName__Model.omit({ id: true })

const New__ModelName__Page = () => {
  const router = useRouter()
  if (process.env.parentModel) {
    const __parentModelId__ = useParam("__parentModelId__", "number")
  }
  const [create__ModelName__Mutation] = useMutation(create__ModelName__)

  return (
    <AdminLayout title="Create New __ModelName__">
      <__ModelName__Form
        submitText="Create __ModelName__"
        schema={Create__ModelName__}
        onSubmit={async (values) => {
          try {
            const __modelName__ = await create__ModelName__Mutation(
              process.env.parentModel
                ? { ...values, __parentModelId__: __parentModelId__! }
                : values
            )
            router.push(
              process.env.parentModel
                ? Routes.Show__ModelName__Page({
                    __parentModelId__: __parentModelId__!,
                    __modelId__: __modelName__.id,
                  })
                : Routes.Show__ModelName__Page({ __modelId__: __modelName__.id })
            )
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </AdminLayout>
  )
}

New__ModelName__Page.authenticate = true

export default New__ModelName__Page
