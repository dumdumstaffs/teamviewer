import { customAlphabet } from "nanoid"

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 10)

export const generateId = () => nanoid(4) + "-" + nanoid(6)