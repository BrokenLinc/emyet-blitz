import { z } from "zod"

import { Form, FormProps } from "app/core/components/NewForm"
import { LabeledTextField } from "app/core/components/NewTextField"
import LabeledTextarea from "app/core/components/NewTextArea"
import LabeledCheckbox from "app/core/components/NewCheckbox"
export { FORM_ERROR } from "app/core/components/Form"

export function SkillForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="learningscript" label="Learning script" />
      <LabeledTextField name="gameid" label="Game ID" inputProps={{ type: "number" }} />
      <LabeledCheckbox name="isdeleted" label="Deleted" />
      <LabeledTextarea name="description" label="Description" />
    </Form>
  )
}
