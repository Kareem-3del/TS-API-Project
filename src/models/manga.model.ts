import * as mongoose from 'mongoose';
import {Chapter, Manga} from "../interfaces/manga.interface";
import {User} from "../interfaces/user.interface";

const MangaSchema = new mongoose.Schema({
    title: String,
    story: String,
    type: String,
    rate: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: false
    },
    generis: Array,
    age: {
        type: Number,
        default: 0
    },
    create_At: {
        type: Date,
        default: Date.now()
    },
    //followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

}, {
    toJSON: {
        virtuals: true,
    },
},);
MangaSchema.virtual('chapters', {
    ref: 'Chapters',
    localField: '_id',
    foreignField: '_id',
});


const ChapterSchema = new mongoose.Schema({
    manga: {type: mongoose.Schema.Types.ObjectId, ref: 'Manga'},
    novel: {
        type: Boolean,
        default: false
    },
    title: String,
    published: Boolean,
    create_At: Date,
    By_: {
        Translator: {type : mongoose.Schema.Types.ObjectId , ref: 'User' },
        Cleaner: {type : mongoose.Schema.Types.ObjectId , ref: 'User' },
        Editor: {type : mongoose.Schema.Types.ObjectId , ref: 'User' },
    },
    content: {type: String, required: true},
    bcrypt: String
})


const MangaModel = mongoose.model<Manga & mongoose.Document>('Manga', MangaSchema);
const ChapterModel = mongoose.model<Chapter & mongoose.Document>('Chapters', ChapterSchema);
export {MangaModel, ChapterModel};