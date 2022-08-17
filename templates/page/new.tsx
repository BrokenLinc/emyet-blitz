import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"

import AdminLayout from "app/core/layouts/AdminLayout"
import createItem from "app/animals/mutations/createAnimal"
import ItemForm, { FORM_ERROR } from "app/animals/components/AnimalForm"
import { AnimalModel as Model } from "db/zod"

const ModelName = "__ModelName__"
const modelNameId = "__modelName__Id"
const schema = Model.omit({ id: true })
const getShowRoute = (id: number) => Routes.Show__ModelName__Page({ [modelNameId]: id })

const New__ModelName__Page = () => {
  const router = useRouter()
  const [createMutation] = useMutation(createItem)

  return (
    <AdminLayout title={`Create New ${ModelName}`}>
      <ItemForm
        submitText="Create"
        schema={schema}
        onSubmit={async (values) => {
          try {
            const item = await createMutation(values)
            router.push(getShowRoute(item.id))
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
