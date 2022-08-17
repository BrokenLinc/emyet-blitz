import jsonSchema from "../../db/json-schema/json-schema.json"
import getSchemaMeta from "./components/admin/getSchemaMeta"

const getColumnFields = (ModelName: keyof typeof jsonSchema.definitions) => {
  const model = jsonSchema.definitions[ModelName]
  const columnFields = Object.keys(model.properties).filter((propertyName) => {
    const meta = getSchemaMeta(ModelName, propertyName)
    return meta.column
  })
  return columnFields
}

export default getColumnFields
