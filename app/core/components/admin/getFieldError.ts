export const getFieldError = (errors: { [x: string]: any }, name: string): string | undefined => {
  if (Array.isArray(errors[name])) return errors[name].join(", ")
  if (typeof errors[name] === "string") return errors[name]
  return errors[name]?.message
}
