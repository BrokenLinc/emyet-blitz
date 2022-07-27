import fs from "fs"
import path from "path"
import { parse } from "csv"
import _ from "lodash"

import db from "./index"

const csvPath = "./db/seed-csv"

let records: any[] = []
const parser = parse({
  delimiter: "|",
  relax_quotes: true,
  columns: (header) => {
    return header.map((label) => label.toLowerCase())
  },
  cast: (value, context) => {
    if (context.header) return value

    if (_.isNil(value)) return null

    const column = String(context.column)

    // Number
    const number = value === "" ? null : Number(value)
    if (column === "gameid") return number
    if (column.includes("level") && column !== "levelid") return number
    for (let searchString of ["type", "value"]) {
      if (column.includes(searchString)) return number
    }
    for (let searchString of ["cash", "gender", "damage"]) {
      if (_.startsWith(column, searchString)) return number
    }
    for (let searchString of [
      "min",
      "max",
      "chance",
      "type",
      "weight",
      "points",
      "rank",
      "duration",
      "modifier",
      "cooldown",
      "experience",
      "health",
      "wins",
      "losses",
      "priority",
      "times",
      "healing",
      "armor",
      "attack",
      "defense",
      "variation",
      "bonus",
    ]) {
      if (_.endsWith(column, searchString)) return number
    }

    // Boolean
    const boolean = value === "" ? null : value.toLowerCase() === "true"
    if (column === "itemconsumedonsuccess") return boolean
    if (_.startsWith(column, "use") && column !== "userid") return boolean
    for (let searchString of ["is", "notrade"]) {
      if (_.startsWith(column, searchString)) return boolean
    }

    // Date
    const date = value === "" ? null : new Date(value)
    for (let searchString of ["date"]) {
      if (column.includes(searchString)) return date
    }
    for (let searchString of ["at", "time"]) {
      if (_.endsWith(column, searchString)) return date
    }

    return String(value)
  },
})
parser.on("readable", function () {
  let record
  while ((record = parser.read()) !== null) {
    records.push(record)
  }
})
parser.on("error", function (err) {
  console.error(err.message)
})
parser.on("end", function () {
  console.log(records)
})

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  try {
    const files = await fs.promises.readdir(csvPath)
    for (const file of files) {
      const filePath = path.join(csvPath, file)
      records = []
      parser.write(fs.readFileSync(filePath, "utf8"))
      parser.end()
    }
  } catch (error) {
    console.error(error)
  }
  // for (let i = 0; i < 5; i++) {
  //   await db.skill.create({
  //     data: {
  //       name: "Skill " + i,
  //       learningscript: "---",
  //       gameid: 0,
  //       isdeleted: false,
  //     },
  //   })
  // }
}

export default seed
