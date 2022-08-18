import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"

import AdminLayout from "app/core/layouts/AdminLayout"

import {
  modelString,
  modelRouteHelpers,
  modelSchema,
  modelMutations,
  modelQueries,
  modelValidators,
} from "app/__modelNames__/components/__modelName__Helpers"
import ItemForm, { FORM_ERROR } from "app/__modelNames__/components/__ModelName__Form"

const New__ModelName__Page = () => {
  const router = useRouter()
  const [createMutation] = useMutation(modelMutations.createItem)

  return (
    <AdminLayout title={`Create New ${modelString.Name}`}>
      <ItemForm
        submitText="Create"
        schema={modelValidators.create}
        onSubmit={async (values) => {
          try {
            const item = await createMutation(values)
            router.push(modelRouteHelpers.getShowRoute(item.id))
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
