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
      const tableName = file.split(".")[0]
      if (!tableName) continue

      console.log(`Parsing ${file}...`)
      const records = await parseCsvFile(filePath, tableName)
      console.log(`Parsed ${records.length} records from ${file}`)
      for (const record of records) {
        await db[tableName].create({ data: record })
      }
      console.log(`Inserted ${records.length} records into ${tableName}`)
      console.log("-----------------------------------------------------")
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

const coerceValue = (tableName: string, columnName: string, value: any) => {
  const table = jsonSchema.definitions[tableName]
  const column = table.properties[columnName]
  const type = _.flatten([column?.type])[0]
  const format = column?.format
  switch (type) {
    case "integer":
    case "number":
      return Number(value)
    case "boolean":
      return value === "True"
    case "string":
      if (format === "date-time") {
        return new Date(value)
      }
      if (value.length === 38 && _.startsWith(value, "{") && _.endsWith(value, "}")) {
        return value.slice(1, -1)
      }
      if (columnName.includes("id") && value === "") {
        return null
      }
    default:
      return value
  }
}
