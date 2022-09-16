import { Request } from "express"
import { ZodError, ZodSchema } from "zod"
import { ValidationError } from "../error"

export async function validateBody<T>(req: Request, schema: ZodSchema<T>) {
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
