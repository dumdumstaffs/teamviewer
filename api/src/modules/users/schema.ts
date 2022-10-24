import { z } from "zod";

export const CreateUser = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
    isAdmin: z.boolean().optional()
})

export const UpdateUser = z.object({
    name: z.string(),
    stocks: z.array(z.object({
        name: z.string(),
        profit: z.number(),
        symbol: z.string(),
        overview: z.string(),
    })),
})