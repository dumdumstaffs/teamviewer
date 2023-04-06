import { Request } from "express"
import { ZodError, ZodSchema, ZodTypeDef } from "zod"
import { ValidationError } from "../error"

export async function validateBody<O, D extends ZodTypeDef, I>(req: Request, schema: ZodSchema<O, D, I>) {
    try {
        const body = await schema.parseAsync(req.body || {})
        return body
    } catch (err) {
        if (err instanceof ZodError) {
            throw new ValidationError(err)
        }
        throw err
    }
}
