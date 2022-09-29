import _ from "lodash"

export const getItemLabel = (entity: any) => {
  return _.trim(
    JSON.stringify(entity.label || entity.name || entity.title || entity.id || entity),
    '"'
  )
}
