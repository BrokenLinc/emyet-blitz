import React from "react"
import { useFormContext } from "react-hook-form"
import * as UI from "@chakra-ui/react"

export interface InputControlProps extends UI.FormControlProps {
  name: string
  label: string
  labelProps?: UI.FormLabelProps
  inputProps?: UI.InputProps
}

export const InputControl = React.forwardRef<UI.InputProps, InputControlProps>(
  ({ name, label, labelProps, inputProps, ...formControlProps }, ref) => {
    const { formState, ...form } = useFormContext()

    const error = Array.isArray(formState.errors[name])
      ? // @ts-ignore // TODO: solve this
        formState.errors[name].join(", ")
      : formState.errors[name]?.message || formState.errors[name]

    return (
      <UI.FormControl isInvalid={!!error} {...formControlProps}>
        <UI.FormLabel {...labelProps}>{label}</UI.FormLabel>
        <UI.Input isDisabled={formState.isSubmitting} {...form.register(name)} {...inputProps} />
        <UI.FormErrorMessage>{error}</UI.FormErrorMessage>
      </UI.FormControl>
    )
  }
)
