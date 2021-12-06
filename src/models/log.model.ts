import * as mongoose from "mongoose";

interface LogSchema {
    type: String,
    msg : String,
    from : String,
    to: String,
}

const LogSchema = new mongoose.Schema({
    type: String,
    msg : String,
    from : String,
    to: String,
})

const LogModel = mongoose.model<LogSchema & mongoose.Document>('Log', LogSchema);
export default LogModel