import HttpException from './http.exception';


class MangaNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Manga with id ${id} not found`);
    }
}

export {MangaNotFoundException};