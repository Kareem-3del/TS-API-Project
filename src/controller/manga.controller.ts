import {Request, Response, NextFunction, Router} from 'express';
import {MangaNotFoundException} from '../exceptions/manga.exception';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from '../DTO/manga.dto';
import {Manga} from '../interfaces/manga.interface';
import {MangaModel} from '../models/manga.model';
import {isValidObjectId} from "mongoose";

class PostController implements Controller {
    public path = '/manga';
    public router = Router();
    private mangaDB = MangaModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllManga);
        this.router.get(`${this.path}/:id`, this.getMangaById);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyManga)
            .delete(`${this.path}/:id`, this.deleteManga)
            .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.AddManga);
    }

    private  getAllManga = async (request: Request,response: Response)=> {
        const posts = await this.mangaDB.find()
        response.send(posts);
    }

    private getMangaById = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        if (isValidObjectId(id)) {
            const magna = await this.mangaDB.findById(id);
            if (magna) {
                response.send(magna);
            } else {
                next(new MangaNotFoundException(id));
            }
        }else
        {
            next(new MangaNotFoundException(id));
        }
    }



    private deleteManga = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const postData: Manga = request.body;
        const post = await this.mangaDB.findByIdAndUpdate(id, postData, {new: true});
        if (post) {
            response.send(post);
        } else {
            next(new MangaNotFoundException(id));
        }
    }

    private AddManga = async (request: RequestWithUser, response: Response) => {
        console.log('Add-Manga')
        const MangaData: CreatePostDto = request.body;
        const createdPost = new this.mangaDB({
            ...MangaData,
            author: request.user._id,
        });
        const savedPost = await createdPost.save();
        await savedPost.populate('author', '-password')
        response.send(savedPost);
    }

    private modifyManga = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const successResponse = await this.mangaDB.findByIdAndDelete(id);
        if (successResponse) {
            response.send(200);
        } else {
            next(new MangaNotFoundException(id));
        }
    }


}

export default PostController;