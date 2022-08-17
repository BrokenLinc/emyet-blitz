import { z } from "zod"
import _ from "lodash"

import { Form, FormProps } from "app/core/components/admin/Form"
import { InputControl } from "./InputControl"
import { CheckboxControl } from "./CheckboxControl"
import { TextareaControl } from "./TextareaControl"
export { FORM_ERROR } from "app/core/components/Form"

import jsonSchema from "../../../../db/json-schema/json-schema.json"
import getSchemaMeta from "./getSchemaMeta"

export function createFormWithSchema(tableName: keyof typeof jsonSchema.definitions) {
  function SchemaForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
    const controls = _.map(jsonSchema.definitions[tableName].properties, (property, name) => {
      if (name.includes("id")) return null

      const type = _.flatten([property["type"]])[0]
      if (!type) return null

      const label = _.startCase(name)
      const meta = getSchemaMeta(tableName, name)

      if (type === "boolean") {
        return <CheckboxControl name={name} label={label} />
      } else if (["int", "number", "decimal", "float"].includes(type)) {
        return <InputControl inputProps={{ type: "number" }} name={name} label={label} />
      } else if (type === "string") {
        if (meta.multiline) {
          return <TextareaControl name={name} label={label} />
        }
        return <InputControl name={name} label={label} />
      }
    })

    return <Form<S> {...props}>{controls}</Form>
  }
  return SchemaForm
}
