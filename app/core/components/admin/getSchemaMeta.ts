import _ from "lodash"
import jsonSchema from "../../../../db/json-schema/json-schema.json"

const getSchemaMeta = (modelName: string, propertyName: string = "id") => {
  return JSON.parse(
    _.get(jsonSchema.definitions, `${modelName}.properties.${propertyName}.description`, "{}")
  )
}

export default getSchemaMeta
