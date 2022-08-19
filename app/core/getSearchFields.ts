import _ from "lodash"
import { schema } from "./schema"

const getSearchFields = (modelName: keyof typeof schema.definitions) => {
  const model = schema.definitions[modelName]
  const columnFields = _.filter(model.properties, (property) => {
    return property.meta.searchable
  })
  return columnFields
}

export default getSearchFields
