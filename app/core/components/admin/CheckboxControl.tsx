import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import * as UI from "@chakra-ui/react"

export interface CheckboxControlProps extends UI.FormControlProps {
  name: string
  label: string
  labelProps?: UI.FormLabelProps
  checkboxProps?: UI.CheckboxProps
}

export const CheckboxControl = React.forwardRef<UI.CheckboxProps, CheckboxControlProps>(
  ({ name, label, labelProps, checkboxProps, ...formControlProps }, ref) => {
    const { formState, ...form } = useFormContext()

    const error = Array.isArray(formState.errors[name])
      ? // @ts-ignore // TODO: solve this
        formState.errors[name].join(", ")
      : formState.errors[name]?.message || formState.errors[name]

    return (
      <UI.FormControl isInvalid={!!error} {...formControlProps}>
        <Controller
          control={form.control}
          name={name}
          defaultValue={false}
          render={({ field: { value, ...field } }) => (
            <UI.Checkbox
              {...field}
              isChecked={value}
              isDisabled={formState.isSubmitting}
              {...checkboxProps}
            >
              {label}
            </UI.Checkbox>
          )}
        />
        <UI.FormErrorMessage>{error}</UI.FormErrorMessage>
      </UI.FormControl>
    )
  }
)
