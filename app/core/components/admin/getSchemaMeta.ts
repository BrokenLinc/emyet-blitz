import _ from "lodash"

const getSchemaMeta = (model: any, propertyName: string = "id") => {
  const meta = JSON.parse(_.get(model, `properties.${propertyName}.description`, "{}"))
  return meta
}

export default getSchemaMeta
