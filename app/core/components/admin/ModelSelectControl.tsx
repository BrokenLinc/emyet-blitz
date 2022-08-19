import React from "react"
import { useFormContext } from "react-hook-form"
import * as UI from "@chakra-ui/react"
import { useQuery } from "@blitzjs/rpc"
import getAnimals from "app/animals/queries/getAnimals"

import { getFieldError } from "./getFieldError"

export interface ModelSelectControlProps extends UI.FormControlProps {
  name: string
  label: string
  labelProps?: UI.FormLabelProps
  selectProps?: UI.SelectProps
  required?: boolean
}

export const ModelSelectControl: React.FC<ModelSelectControlProps> = (
  { name, label, labelProps, selectProps, ...formControlProps },
  ref
) => {
  const { formState, ...form } = useFormContext()
  const [{ items }] = useQuery(getAnimals, {
    orderBy: { id: "asc" },
  })

  const error = getFieldError(formState.errors, name)

  return (
    <UI.FormControl isInvalid={!!error} {...formControlProps}>
      <UI.FormLabel {...labelProps}>{label}</UI.FormLabel>
      <UI.Select isDisabled={formState.isSubmitting} {...registrationProps} {...selectProps}>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </UI.Select>
      <UI.FormErrorMessage>{error}</UI.FormErrorMessage>
    </UI.FormControl>
  )
}
