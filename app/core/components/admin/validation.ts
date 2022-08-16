import { z } from "zod"

export const castedInt = (fallbackValue?: number) =>
  z.preprocess((val) => {
    if (typeof val === "number") return val
    if (typeof val === "string") {
      const int = parseInt(val)
      return isNaN(int) ? fallbackValue : int
    }
    return fallbackValue
  }, z.number().int())

export const castedBoolean = (fallbackValue?: boolean) =>
  z.preprocess((_val: any) => {
    const val = typeof _val === "string" ? _val.toLowerCase() : _val
    if ([true, "true", 1, "1", "yes"].includes(val)) return true
    if ([false, "false", 0, "0", "no"].includes(val)) return false
    return fallbackValue
  }, z.boolean())
