import App from './app';
import MangaController from './controller/manga.controller';
import 'dotenv/config';

const app = new App(
    [
        new MangaController(),
    ]
);
app.listen()