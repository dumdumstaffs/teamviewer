import { nanoid } from "nanoid"

export const generateId = () => nanoid(4).toUpperCase() + "-" + nanoid(6).toUpperCase()