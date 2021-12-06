import LogModel from "../../models/log.model";
function Logger(msg:String,type : "AUTH"|"USER"|"UPLOAD"|"DB"|"ADMIN"|"BUY"|"MANGA"|"CHAPTER"|"ETC",from : String = "system",to : String = "all"){
    console.log(`[${type}] => [${msg}] From : ${from} Effect ON => [${to}]`)
    const log = new LogModel({
        msg : msg,
        type : type,
        from : from,
        to : to
    })
    log.save(function (err) {
        if(err){
            console.error('FAILED TO SAVE LOG')
        }
    })
}
export default Logger