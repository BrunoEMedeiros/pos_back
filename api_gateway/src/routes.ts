import { Router } from "express";
import { NewsController } from "./Controllers/NewsController";
import { UserController } from "./Controllers/UserController";
import { validate } from "./validation";
import { schemaComments, schemaNews, schemaReactions, schemaUsers, schemaUsersUpdate } from "./schemas";

const router: Router = Router()
const newController: NewsController = new NewsController();
const userController: UserController = new UserController();

/*
queues: 
    news
    newsUpdate
    newsPublish
    newsDelete
    reactions
    reactionsUpdate
    comments
    commentsUpdate
    commentDelete
    readers
    authors
    admin
    activate
    usersUpdate
    usersBlock
    changePassword
*/

router.post("/news", validate("post", schemaNews), newController.createNews); //ms news
router.put("/news/:id", validate("put", schemaNews), newController.updateNews); //ms update news
router.put("/publish/:id", validate("publish", schemaNews), newController.publishNews) //ms publish news
router.delete("/news/:id", validate("delete", schemaNews), newController.deleteNews); //ms delete news

router.post("/reactions/:id", validate("put", schemaReactions),  newController.reactionNews); //ms reactions
router.put("/reactions/:id", validate("put", schemaReactions), newController.reactionUpdate) //ms update reactions

router.post("/comments", validate("post", schemaComments), newController.commentNews); //ms comments
router.put("/comments/:id", validate("put", schemaComments), newController.updateComment); // ms comments delete
router.delete("/comments/:id", validate("delete", schemaComments), newController.deleteComment);

router.post("/readers", validate("post",schemaUsers), userController.createReader); //ms users
router.post("/authors", validate("post",schemaUsers), userController.createAuthor); //ms users
router.post("/admin", validate("post",schemaUsers), userController.createAdmin); //ms users
router.put("/activate/:id", validate("activate", schemaUsers), userController.activateUser); //ms ativate user
router.put("/users/:id", validate("put", schemaUsersUpdate), userController.updateUser); //ms update users
router.delete("/users/:id", validate("delete",schemaUsers), userController.blockUser); //ms block users

router.get("/news", newController.allNews); //todas as noticias publicadas
router.get("/news/:id", newController.newsDetails); //detalhes da noticia
router.get("/author/:id", newController.authorNews); //todas as noticias de determinado autor
router.get("/admin", newController.newsAdmin); //todas as noticias -> admin
router.get("/author", userController.allAuthors); //todos os autores e contador de noticias de cada um
router.get("/by/:nick", newController.newsByNick); //all news by nickname
router.post("/login", userController.login)
/*
router.put("/email/:id", validate("delete", schemaUsers), userController);
router.put("/password/:id", validate("password",schemaUsers), userController.changePassword); //ms change password
*/
export { router };
