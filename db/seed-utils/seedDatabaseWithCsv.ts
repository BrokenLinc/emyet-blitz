import fs from "fs"
import path from "path"
import { parse } from "csv"
import _ from "lodash"

import jsonSchema from "../json-schema/json-schema.json"
import db from "../index"

export const seedDatabaseWithCsv = async (csvPath = "./db/seed-csv") => {
  try {
    const files = await fs.promises.readdir(csvPath)
    console.log(`Found ${files.length} files in ${csvPath}`)
    for (const file of files) {
      const filePath = path.join(csvPath, file)
      const tableName = file.split(".")[1]
      if (!tableName) continue

      const records = await parseCsvFile(filePath, tableName)
      console.log(`Parsed ${records.length} records from ${file}`)
      for (const record of records) {
        await db[tableName].create({ data: record })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const parseCsvFile = async (filePath: string, tableName: string) => {
  return new Promise<object[]>((resolve, reject) => {
    if (!filePath || !tableName) reject()

    // console.log(filePath, tableName)

    const records: any[] = []
    const parser = parse({
      delimiter: "\t",
      record_delimiter: "|",
      relax_quotes: true,
      columns: (header) => {
        return header.map((label) => label.toLowerCase())
      },
      cast: (value, context) => {
        if (context.header) return value
        if (_.isNil(value)) return null
        const column = String(context.column)
        return coerceValue(tableName, column, value)
      },
    })
    parser.on("readable", () => {
      let record
      while ((record = parser.read()) !== null) {
        records.push(record)
      }
    })
    parser.on("error", (err) => {
      console.error(err.message)
    })
    parser.on("end", () => {
      resolve(records)
    })
    parser.write(fs.readFileSync(filePath, "utf8"))
    parser.end()
  })
}

const coerceValue = (tableName: string, column: string, value: any) => {
  const table = jsonSchema.definitions[tableName]
  const type = _.flatten([table.properties[column]?.type])[0]
  switch (type) {
    case "decimal":
    case "integer":
      return Number(value)
    case "boolean":
      return value === "True"
    case "string":
      if (
        value.length === 38 &&
        column.includes("id") &&
        _.startsWith(value, "{") &&
        _.endsWith(value, "}")
      ) {
        return value.slice(1, -1)
      }
    default:
      return value
  }
}
