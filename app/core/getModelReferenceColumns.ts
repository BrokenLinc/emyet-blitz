import _ from "lodash"

export const getModelReferenceColumns = (modelSchema) => {
  const result = modelSchema.columns
    ? _.reduce(
        modelSchema.columns,
        (acc, column) => {
          if (column.type === undefined || column.type === "array") {
            return { [column.key]: true, ...acc }
          }
          return acc
        },
        {}
      )
    : {}

  if (_.isEmpty(result)) {
    return undefined
  }

  return result
}
