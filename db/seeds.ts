import { seedDatabaseWithCsv } from "./seed-utils/seedDatabaseWithCsv"

/*
 * This seed function is executed when you run `blitz db seed`.
 */
const seed = async () => {
  seedDatabaseWithCsv()
}

export default seed
