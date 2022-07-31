import { z } from "zod"

export const castedInt = () =>
  z.preprocess((val) => {
    if (typeof val === "number") return val
    if (typeof val === "string") {
      const int = parseInt(val)
      return isNaN(int) ? undefined : int
    }
    return undefined
  }, z.number().int())
