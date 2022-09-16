import { Handler, HandlerResponse } from '@netlify/functions';
import serverless from "serverless-http";
import { app } from '../app';

const serverlessHandler = serverless(app);

export const handler: Handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false

    const result = await serverlessHandler(event, context) as HandlerResponse
    return result;
}
