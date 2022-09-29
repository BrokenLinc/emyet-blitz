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

import { schema } from "app/core/schema"

export function createFormWithSchema(modelName: keyof typeof schema.definitions) {
  function SchemaForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
    const controls = _.map(schema.definitions[modelName].properties, (property, name) => {
      const { label, meta, required, type, relatedModel } = property
      if (!type) return null
      if (name === "id") return null

      if (relatedModel && type === "integer") {
        return (
          <ModelSelectControl
            model={relatedModel}
            key={name}
            name={name}
            label={label}
            required={required}
          />
        )
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
