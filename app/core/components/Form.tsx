import { useState, ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import * as UI from "@chakra-ui/react"

export interface FormProps<S extends z.ZodType<any, any>> extends UI.StackProps {
  formProps?: Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">
  children?: ReactNode
  submitLabel: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  formProps,
  children,
  submitLabel = "Save",
  schema,
  initialValues,
  onSubmit,
  ...stackProps
}: FormProps<S>) {
  const form = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  const handleFormSubmit = form.handleSubmit(async (_values) => {
    const values = schema ? schema.parse(_values) : _values
    const result = (await onSubmit(values)) || {}
    for (const [key, value] of Object.entries(result)) {
      if (key === FORM_ERROR) {
        setFormError(value)
      } else {
        form.setError(key as any, {
          type: "submit",
          message: value,
        })
      }
    }
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={handleFormSubmit} {...formProps}>
        <UI.VStack spacing={4} maxW="500px" alignItems="start" mb={4} {...stackProps}>
          {children}

          {formError ? <UI.Alert colorScheme="red">{formError}</UI.Alert> : null}

          <UI.Button type="submit" isDisabled={form.formState.isSubmitting}>
            {submitLabel}
          </UI.Button>
        </UI.VStack>
      </form>
    </FormProvider>
  )
}
