import React from "react"
import { useFormContext } from "react-hook-form"
import * as UI from "@chakra-ui/react"

export interface LabeledTextareaProps extends UI.FormControlProps {
  name: string
  label: string
  labelProps?: UI.FormLabelProps
  textareaProps?: UI.TextareaProps
}

export const LabeledTextarea = React.forwardRef<UI.TextareaProps, LabeledTextareaProps>(
  ({ name, label, labelProps, textareaProps, ...formControlProps }, ref) => {
    const { formState, ...form } = useFormContext()

    const error = Array.isArray(formState.errors[name])
      ? // @ts-ignore // TODO: solve this
        formState.errors[name].join(", ")
      : formState.errors[name]?.message || formState.errors[name]

    return (
      <UI.FormControl isInvalid={!!error} {...formControlProps}>
        <UI.FormLabel {...labelProps}>{label}</UI.FormLabel>
        <UI.Textarea
          isDisabled={formState.isSubmitting}
          {...form.register(name)}
          {...textareaProps}
        />
        <UI.FormErrorMessage>{error}</UI.FormErrorMessage>
      </UI.FormControl>
    )
  }
)

export default LabeledTextarea
