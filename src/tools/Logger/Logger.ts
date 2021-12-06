import fs from "fs";
const console_log = true;
const chalk = require('chalk')
async function Log_Req (Req:Request,Res:Response) {

    let msg = `[${Req.url}] Auth =>[${!!Req.headers.get('token')}]`
    if(console_log)
    {
        console.log((chalk.red(msg)).toString());
    }
}
export {Log_Req}