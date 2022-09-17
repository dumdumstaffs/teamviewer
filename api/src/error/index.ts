import { ZodError } from "zod"

export class ServerError extends Error {
    constructor(
        public status: number,
        public message: string,
        public data?: Record<string, any>
    ) {
        super(message)
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            ...(this.data || {})
        }
    }
}

export class UnauthorizedError extends ServerError {
    constructor() {
        super(401, "Unauthorized")
    }
}

export class NotFoundError extends ServerError {
    constructor(message: string) {
        super(404, message)
    }
}

export class ValidationError extends ServerError {
    constructor(err: ZodError) {
        super(422, "Validation error", {
            fields: err.issues
        })
    }
}
