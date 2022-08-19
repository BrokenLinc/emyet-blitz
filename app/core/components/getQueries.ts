import getAnimals from "app/animals/queries/getAnimals"
import getFarms from "app/farms/queries/getFarms"
import getPets from "app/pets/queries/getPets"

const getQueries = {
  Animal: getAnimals,
  Farm: getFarms,
  Pet: getPets,
}

export default getQueries
