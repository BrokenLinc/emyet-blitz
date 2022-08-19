import React from "react"
import { useFormContext } from "react-hook-form"
import * as UI from "@chakra-ui/react"

import { getFieldError } from "./getFieldError"

export interface InputControlProps extends UI.FormControlProps {
  name: string
  label: string
  labelProps?: UI.FormLabelProps
  inputProps?: UI.InputProps
}

export const InputControl = React.forwardRef<UI.InputProps, InputControlProps>(
  ({ name, label, labelProps, inputProps, ...formControlProps }, ref) => {
    const { formState, ...form } = useFormContext()

    const error = getFieldError(formState.errors, name)

    const registrationProps =
      inputProps?.type === "number"
        ? form.register(name, { valueAsNumber: true })
        : form.register(name)

    return (
      <UI.FormControl isInvalid={!!error} {...formControlProps}>
        <UI.FormLabel {...labelProps}>{label}</UI.FormLabel>
        <UI.Input isDisabled={formState.isSubmitting} {...registrationProps} {...inputProps} />
        <UI.FormErrorMessage>{error}</UI.FormErrorMessage>
      </UI.FormControl>
    )
  }
)
