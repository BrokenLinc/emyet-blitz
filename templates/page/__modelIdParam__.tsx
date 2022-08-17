import React from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import * as UI from "@chakra-ui/react"

import AdminLayout from "app/core/layouts/AdminLayout"
import get__ModelName__ from "app/__modelNames__/queries/get__ModelName__"
import delete__ModelName__ from "app/__modelNames__/mutations/delete__ModelName__"

export const __ModelName__ = () => {
  const router = useRouter()
  const __modelName__Id = useParam("__modelName__Id", "number") || 0
  if (process.env.parentModel) {
    const __parentModelId__ = useParam("__parentModelId__", "number")
  }
  const [delete__ModelName__Mutation] = useMutation(delete__ModelName__)
  const [__modelName__] = useQuery(get__ModelName__, { id: __modelName__Id })

  return (
    <>
      <UI.Code p={4} mb={6} borderRadius="md" shadow="inner">
        {JSON.stringify(__modelName__, null, 2)}
      </UI.Code>

      <UI.HStack>
        <if condition="parentModel">
          <Link
            href={Routes.Edit__ModelName__Page({
              __parentModelId__: __parentModelId__!,
              __modelId__: __modelName__.id,
            })}
          >
            <UI.Button>Edit</UI.Button>
          </Link>
          <else>
            <Link
              href={Routes.Edit__ModelName__Page({ __modelName__Id: __modelName__.id })}
              passHref
            >
              <UI.Button>Edit</UI.Button>
            </Link>
          </else>
        </if>

        <UI.Button
          colorScheme="red"
          variant="outline"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await delete__ModelName__Mutation({ id: __modelName__.id })
              if (process.env.parentModel) {
                router.push(Routes.__ModelNames__Page({ __parentModelId__: __parentModelId__! }))
              } else {
                router.push(Routes.__ModelNames__Page())
              }
            }
          }}
        >
          Delete
        </UI.Button>
      </UI.HStack>
    </>
  )
}

const Show__ModelName__Page = () => {
  return (
    <AdminLayout title="__ModelName__ Details">
      <React.Suspense fallback={<div>Loading...</div>}>
        <__ModelName__ />
      </React.Suspense>
    </AdminLayout>
  )
}

Show__ModelName__Page.authenticate = true

export default Show__ModelName__Page
