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
} from "app/farms/components/farmHelpers"
import ItemForm, { FORM_ERROR } from "app/farms/components/FarmForm"

const NewFarmPage = () => {
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

NewFarmPage.authenticate = true

export default NewFarmPage
