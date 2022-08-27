import { z } from "zod";

const envSchema = z.object({
    APP_NAME: z.string(),
})

const validatedEnv = envSchema.safeParse(process.env);

function format(errors) {
    return Object.entries(errors)
        .map(([key, errors]) => `${key}: ${errors.join(", ")}\n`)
}

if (!validatedEnv.success) {
    console.error("Invalid environment variables:\n", ...format(validatedEnv.error.flatten().fieldErrors))
    process.exit(1)
}

export const env = validatedEnv.data