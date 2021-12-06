import * as mongoose from 'mongoose';
import {User} from "../interfaces/user.interface";


const INVENTORY = new mongoose.Schema({
    ITEMS: [],
});
const ACCOUNT_THEME = new mongoose.Schema({
    Profile: String,
    Profile_Background: String,
    Profile_Border: String,
    Profile_Comment: String
});
const ACCOUNT_SETTINGS = new mongoose.Schema({
    Hide_Date: {
        type: Boolean,
        default: false
    },
    Hide_Level: {
        type: Boolean,
        default: false
    },
    Hide_Sex: {
        type: Boolean,
        default: false
    },
    Hide_Email: {
        type: Boolean,
        default: false
    },
    Hide_VIP: {
        type: Boolean,
        default: false
    },
    Hide_Borders: {
        type: Boolean,
        default: false
    },
    Receive_Request_Add: {
        type: Boolean,
        default: false
    },
    Receive_Msg_Friends_Only: {
        type: Boolean,
        default: false
    },
    HIDE_IN_SEARCH: {
        type: Boolean,
        default: false
    },
});
const ACCOUNT_DEVICES = new mongoose.Schema({
    IP: String,
    OS: String,
    Driver: String,
    Type: String,
    Location: String,
    Last_OPEN: Date
});

const userSchema = new mongoose.Schema({
    Name: String,
    UserName: String,
    Email: String,
    Date: Date,
    Sex: String,
    Bio: String,
    Level: {
        type : Number,
        default : 0
    },
    NickRole: String,
    Role: String,
    THEME: ACCOUNT_THEME,
    COINS: {
        type : Number,
        default : 0
    },
    VIP: {
        type : Boolean,
        default : false
    },
    VIP_COINS: {
        type : Boolean,
        default : false
    },
    created_at: {
        type : Date,
        default : Date.now()
    },
    Friends : [{type : mongoose.Schema.Types.ObjectId ,ref : 'User'}],
    INVENTORY: INVENTORY,
    ACCOUNT_SETTINGS: ACCOUNT_SETTINGS,
    devices: ACCOUNT_DEVICES,
    History: Array,
    password: {
        type: String,
        required: true,
        get: (): undefined => undefined,
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
},);



const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;