import { z } from "zod"

import { Form, FormProps } from "app/core/components/Form"
import { InputControl } from "app/core/components/InputControl"
import { CheckboxControl } from "app/core/components/CheckboxControl"
import { TextareaControl } from "app/core/components/TextareaControl"
export { FORM_ERROR } from "app/core/components/Form"

export function SkillForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <InputControl name="name" label="Name" placeholder="Name" />
      <InputControl name="learningscript" label="Learning script" />
      <InputControl name="gameid" label="Game ID" inputProps={{ type: "number" }} />
      <CheckboxControl name="isdeleted" label="Deleted" />
      <TextareaControl name="description" label="Description" />
    </Form>
  )
}
