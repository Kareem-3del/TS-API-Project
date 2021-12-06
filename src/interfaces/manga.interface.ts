import mongoose from "mongoose";
import {User} from "./user.interface";

interface Manga {
    id_?: mongoose.Types.ObjectId
    title: String;
    story: String;
    type: "Manhwa" | "Manhua" | "Webtoon" | "Webcomics" | "Manga" | "Novel";
    rate?: Number;
    published?: Boolean;
    author?: String,
    artist?: String,
    generis: Array<String>;
    age?: Number;
    create_At?: Date;
}

interface Chapter {
    manga?: Manga | mongoose.Types.ObjectId
    id_?: mongoose.Types.ObjectId
    novel: Boolean
    title: String;
    published: Boolean;
    create_At: Date;
    content: String | Array<String>
    By_: {
        Translator: User | mongoose.Types.ObjectId,
        Cleaner: User | mongoose.Types.ObjectId,
        Editor: User | mongoose.Types.ObjectId
    }
    bcrypt?: any
}

export {Chapter, Manga}