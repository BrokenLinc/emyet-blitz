import _ from "lodash"
import { schema } from "./schema"

const getColumnFields = (modelName: keyof typeof schema.definitions) => {
  const model = schema.definitions[modelName]
  const columnFields = _.filter(model.properties, (property) => {
    return property.meta.column
  })
  return columnFields
}

export default getColumnFields
