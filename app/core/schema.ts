import _ from "lodash"

import jsonSchema from "../../db/json-schema/json-schema.json"
import getSchemaMeta from "./components/admin/getSchemaMeta"
import getQueries from "./components/getQueries"

const definitions = _.mapValues(jsonSchema.definitions, (model, modelKey) => {
  const meta = getSchemaMeta(model)

  const properties = _.mapValues(model.properties, (property, propertyName) => {
    const [type, secondaryType] = _.flatten([property["type"]])
    const required = secondaryType !== "null"

    let label = _.startCase(propertyName)
    const meta = getSchemaMeta(model, propertyName)
    let relatedModel: keyof typeof getQueries | undefined = undefined

    if (type === "array") {
      // console.log(modelKey, propertyName, type, property)
      relatedModel = _.get(property["items"], required ? "$ref" : "anyOf[0].$ref")
        .split("/")
        .pop()
      // console.log(modelKey, label, relatedModel)
    } else if (meta.relation) {
      label = _.startCase(meta.relation)
      relatedModel = _.get(model.properties[meta.relation], required ? "$ref" : "anyOf[0].$ref")
        .split("/")
        .pop()
    }

    return {
      key: propertyName,
      label,
      type,
      relatedModel,
      required,
      meta,
    }
  })

  const columns = _.filter(properties, (property) => {
    return property.meta.column
  })
  const searchFields = _.reduce(
    properties,
    (acc, property, propertyName) => {
      return property.meta.searchable ? [...acc, propertyName] : acc
    },
    []
  )

  return {
    meta,
    properties,
    columns,
    searchFields,
  }
})

export const schema = {
  definitions,
}
