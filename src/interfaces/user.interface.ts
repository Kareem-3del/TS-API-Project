 interface User {
    _id? : String,
    Name : String,
    UserName : String,
    Email : String,
    PassWord : String,
    Date : Date,
    Sex : "Male" | "Female",
    Bio : String,
    Level : Number,
    NickRole : String
    Role : String,
    THEME : THEME
    COINS : Number,
    VIP : String,
    VIP_COINS : Number,
    INVENTORY : Array<item>
    ACCOUNT_SETTINGS : ACCOUNT_SETTINGS,
    devices : Array<device>
    created_at : Date,
}
interface item {
    id : String,
    name : String,
    icon : String,
    type : String,
    info : String
}
interface device {
    IP : String,
    OS : String,
    Driver : String,
    Type : String,
    Location : String,
    Last_OPEN : Date
}
interface THEME {
    Profile : String,
    Profile_Background : String,
    Profile_Border : String,
    Profile_Comment : String
}
interface Public_User {
    Name : String,
    UserName : String,
    Email : String|false,
    Date : Date|false,
    Sex : "Male" | "Female" | false,
    Level : Number | false,
    NickRole : String | false,
    Role : String|false,
    THEME : THEME
    VIP : String|false,
    created_at : Date,
}
interface ACCOUNT_SETTINGS {
    Hide_Date : Boolean,
    Hide_Level : Boolean,
    Hide_Sex : Boolean,
    Hide_Email : Boolean,
    Hide_VIP : Boolean,
    Hide_Borders : Boolean,
    Receive_Request_Add : Boolean,
    Receive_Msg_Friends_Only : Boolean,
    HIDE_IN_SEARCH : Boolean,
}

export { User , ACCOUNT_SETTINGS , Public_User , THEME , item , device }