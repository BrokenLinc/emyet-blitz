import React from "react"
import { z } from "zod"
import _ from "lodash"
import * as UI from "@chakra-ui/react"

import { Form, FormProps } from "app/core/components/admin/Form"
import { InputControl } from "./InputControl"
import { CheckboxControl } from "./CheckboxControl"
import { TextareaControl } from "./TextareaControl"
import { ModelSelectControl } from "./ModelSelectControl"
export { FORM_ERROR } from "app/core/components/Form"

import jsonSchema from "../../../../db/json-schema/json-schema.json"
import getSchemaMeta from "./getSchemaMeta"

export function createFormWithSchema(tableName: keyof typeof jsonSchema.definitions) {
  function SchemaForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
    const controls = _.map(jsonSchema.definitions[tableName].properties, (property, name) => {
      if (name.includes("id")) return null

      // const $ref = property["$ref"]
      // if ($ref) {
      //   // TODO: tailor by tableName
      //   return <ModelSelectControl key="animal" name="animalId" label="Animal" />
      // }

      const [type, secondaryType] = _.flatten([property["type"]])
      const required = secondaryType !== "null"
      if (!type) return null

      let label = _.startCase(name)
      const meta = getSchemaMeta(tableName, name)

      if (meta.model) {
        label = _.trim(label, " Id")
        return <ModelSelectControl key={name} name={name} label={label} required={required} />
      }

      if (type === "boolean") {
        return <CheckboxControl key={name} name={name} label={label} />
      } else if (["integer", "number", "decimal", "float"].includes(type)) {
        return <InputControl key={name} inputProps={{ type: "number" }} name={name} label={label} />
      } else if (type === "string") {
        if (meta.multiline) {
          return <TextareaControl key={name} name={name} label={label} />
        }
        return <InputControl key={name} name={name} label={label} />
      }
    })

    return (
      <React.Suspense fallback={<UI.Spinner />}>
        <Form<S> {...props}>{controls}</Form>
      </React.Suspense>
    )
  }
  return SchemaForm
}
