import React from "react"
import { useFormContext } from "react-hook-form"
import * as UI from "@chakra-ui/react"

import { getFieldError } from "./getFieldError"

export interface TextareaControlProps extends UI.FormControlProps {
  name: string
  label: string
  labelProps?: UI.FormLabelProps
  textareaProps?: UI.TextareaProps
}

export const TextareaControl = React.forwardRef<UI.TextareaProps, TextareaControlProps>(
  ({ name, label, labelProps, textareaProps, ...formControlProps }, ref) => {
    const { formState, ...form } = useFormContext()

    const error = getFieldError(formState.errors, name)

    return (
      <UI.FormControl isInvalid={!!error} {...formControlProps}>
        <UI.FormLabel {...labelProps}>{label}</UI.FormLabel>
        <UI.Textarea
          height="152px"
          isDisabled={formState.isSubmitting}
          {...form.register(name)}
          {...textareaProps}
        />
        <UI.FormErrorMessage>{error}</UI.FormErrorMessage>
      </UI.FormControl>
    )
  }
)
