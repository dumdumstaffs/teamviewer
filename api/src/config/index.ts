import { z } from "zod";

const envSchema = z.object({
    MONGO_URI: z.string(),
    ADMIN_EMAIL: z.string(),
    ADMIN_PASS: z.string(),
})

const validatedEnv = envSchema.safeParse(process.env);

function format(errors: Record<string, string[] | undefined>) {
    return Object.entries(errors)
        .map(([key, errors]) => `${key}: ${errors?.join(", ")}\n`)
}

if (!validatedEnv.success) {
    console.error("Invalid environment variables:\n", ...format(validatedEnv.error.flatten().fieldErrors))
    process.exit(1)
}

export const config = validatedEnv.data