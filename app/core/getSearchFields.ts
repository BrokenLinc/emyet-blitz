import jsonSchema from "../../db/json-schema/json-schema.json"
import getSchemaMeta from "./components/admin/getSchemaMeta"

const getSearchFields = (ModelName: keyof typeof jsonSchema.definitions) => {
  const model = jsonSchema.definitions[ModelName]
  const searchFields = Object.keys(model.properties).filter((propertyName) => {
    const meta = getSchemaMeta(ModelName, propertyName)
    return meta.searchable
  })
  return searchFields
}

export default getSearchFields
