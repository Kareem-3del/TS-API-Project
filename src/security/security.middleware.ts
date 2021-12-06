import {NextFunction,Request, Response} from 'express';
import chalk from 'chalk';
import * as requestIP from 'request-ip'
async function SecurityMiddleware(request: Request, response: Response, next: NextFunction) {
    const clientIp = requestIP.getClientIp(request);
    console.log(chalk.bgGreen.black(`[${request.method}]`)+chalk.green(` <=|[${request.url}]|=> `)+ chalk.bgRed.black(`[${(clientIp?.search('127.0.0.1')) ? 'Localhost' : clientIp }]`))

    next()
}
export default SecurityMiddleware