export const clientConfig = {
    app: {
        NAME: process.env.APP_NAME as string,
    },
    api: {
        BASE: process.env.API_BASE as string
    }
} as const