import React from "react"
import { useController, useFormContext } from "react-hook-form"
import * as UI from "@chakra-ui/react"
import { useQuery } from "@blitzjs/rpc"
import _ from "lodash"

import { getFieldError } from "./getFieldError"
import getQueries from "../getQueries"
export interface ModelSelectControlProps extends UI.FormControlProps {
  model: keyof typeof getQueries
  name: string
  label: string
  labelProps?: UI.FormLabelProps
  selectProps?: UI.SelectProps
  required?: boolean
}

export const ModelSelectControl: React.FC<ModelSelectControlProps> = ({
  model,
  name,
  label,
  labelProps,
  selectProps,
  ...formControlProps
}) => {
  const { formState, ...form } = useFormContext()
  const {
    field: { onChange, value, ...fieldProps },
  } = useController({
    name,
    control: form.control,
  })
  const [{ items }] = useQuery(getQueries[model], {
    orderBy: { name: "asc" },
  })

  const error = getFieldError(formState.errors, name)

  return (
    <UI.FormControl isInvalid={!!error} {...formControlProps}>
      <UI.FormLabel {...labelProps}>{label}</UI.FormLabel>
      <UI.Select
        isDisabled={formState.isSubmitting}
        onChange={(e) => onChange(parseFloat(e.target.value) || null)}
        value={_.isNil(value) ? "" : value}
        {...fieldProps}
        {...selectProps}
      >
        <option>Not specified</option>
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
