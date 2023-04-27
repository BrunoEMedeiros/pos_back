import { Request, Response } from "express";
import { IMessage } from "../product";
import { Product } from "../product";
//import { getRedis, redisClient } from "../redis";
import { v4 as uuidv4 } from 'uuid';
import { DatabaseModel } from '../DatabaseModel';
const banco = new DatabaseModel().pool;


const productMessage: Product = new Product();
export class NewsController{
    
    public async createNews(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            const {   
                title ,
                subtitle , 
                content,
                userId
            } = req.body;

           let teste = true;

            await banco.query(`select id from "User" where role = 'AUTHOR' and activated = true and id =${userId}`).then(async (res)=>{
                //console.log(res.rowCount);
                if(res.rowCount == 1){
                  await banco.query(`INSERT INTO public."News"(title, subtitle, text, "createdAt", "updatedAt","deletedAt","published","userId")
                                        VALUES('${title}',
                                        '${subtitle}',
                                        '${content}',
                                        '${new Date().toISOString()}',
                                        '${new Date().toISOString()}',
                                        '1111-11-11',
                                        false,
                                        ${userId})`);
                    teste = true;
                }
                else{
                    teste = false
                }});
            
            if(teste){
                return res.status(200).json("cadastrado com sucesso!");
            }
            else{
                return res.status(400).json("usuario não autorizado");
            }

            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
    }

    public async updateNews(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            const{ id } = req.params;
            const {   
                title ,
                subtitle , 
                content,
                userId
            } = req.body;
    
            let author = req.body;
    
            author = parseFloat(author);
    
            let teste = true;

            await banco.query(`select id from "User" where role = 'AUTHOR' and activated = true and id =${userId}`).then(async (res)=>{
                //console.log(res.rowCount);
                if(res.rowCount == 1){
                    await banco.query(`UPDATE public."News" SET title='${title}', 
                    subtitle='${subtitle}', text='${content}', 
                    "updatedAt"='${new Date().toISOString()}' 
                    WHERE id = ${id};`);
                    teste = true;
                }
                else{
                    teste = false
                }});
            
            if(teste){
                return res.status(200).json("atualizado com sucesso!");
            }
            else{
                return res.status(400).json("usuario não autorizado");
            }

        }catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async publishNews(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            const{ id } = req.params;
            let author = req.body;
    
            author = parseFloat(author);

            await banco.query(`UPDATE public."News" SET "published"=true, "deletedAt"='2222-12-22' WHERE id = ${id};`);
            return res.status(200).json("publicado com sucesso!");
    
        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async deleteNews(req: Request, res: Response) {
        try {
            //const queue = uuidv4();
            let teste = true;
            const{ id } = req.params;
            await banco.query(`select id from "News" where id 
            in(select "newId" from "Comment" where "newId" = ${id}) or 
            id in(select "newId" from "Reaction" where "newId" = ${id});`).then(async (res)=>{
            //console.log(res.rowCount);
            if(res.rowCount == 0){
                await banco.query(`UPDATE public."News" SET "deletedAt"='${new Date().toISOString()}', 
                "published"=false WHERE id = ${id};`);
               teste = true;
            }
            else{
                teste = false;
            }
            });

            if(teste){
                return res.status(200).json("deletado com sucesso!");
            }
            else{
                return res.status(400).json("esta noticia nao pode ser excluida");
            }

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async reactionNews(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            const { id } = req.params;
            let teste = true;
            const {   
                reaction,
                userId
            } = req.body;

            await banco.query(`select id from "User" where role = 'AUTHOR' and activated = true and id =${userId}`).then(async (res)=>{
                //console.log(res.rowCount);
                if(res.rowCount == 1){
                  await banco.query(`INSERT INTO public."Reaction"(reaction, "userId", "newId") VALUES ('${reaction}',${userId}, ${id});`);
                  teste = true;
                }
                else{
                  teste = false;
                }
            });

            if(teste){
                return res.status(200).json("criado com sucesso!");
            }
            else{
                return res.status(400).json("usuario nao autorizado");
            }


        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async reactionUpdate(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            const { id } = req.params;
            let teste = true;
            const {   
                reaction,
                userId
            } = req.body;

            await banco.query(`select id from "User" where role = 'AUTHOR' and activated = true and id =${userId}`).then(async (res)=>{
                //console.log(res.rowCount);
                if(res.rowCount == 1){
                  await banco.query(`UPDATE public."Reaction" SET reaction='${reaction}' WHERE "userId"=${userId} and"newId"=${id};`);
                  teste = true;
                }
                else{
                    teste = false;
                }
            });

            if(teste){
                return res.status(200).json("atualizado com sucesso!");
            }
            else{
                return res.status(400).json("usuario nao autorizado");
            }

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async commentNews(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            let teste = true;
            const {   
                comment,
                userId,
                newId
            } = req.body;
    
            
            await banco.query(`select id from "User" where role = 'AUTHOR' and activated = true and id =${userId}`).then(async (res)=>{
                //console.log(res.rowCount);
                if(res.rowCount == 1){
                  await banco.query(`INSERT INTO public."Comment"(comment, "userID", "newId") VALUES ('${comment}', ${userId}, ${newId});`);
                  teste = true;
                }
                else{
                  teste = false;
                }});
            
                if(teste){
                    return res.status(200).json("atualizado com sucesso!");
                }
                else{
                    return res.status(400).json("usuario nao autorizado");
                }

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async updateComment(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            let teste = true;
            const {   
                comment,
                userId,
                newId,
            } = req.body;

            const { id } = req.params;
    
            await banco.query(`select id from "User" where role = 'AUTHOR' and activated = true and id =${userId}`).then(async (res)=>{
                //console.log(res.rowCount);
                if(res.rowCount == 1){
                  await banco.query(`UPDATE public."Comment"SET comment='${comment}', "userID"=${userId}, "newId"=${newId} WHERE id=${id};`);
                  teste = true
                }
                else{
                    teste = false
            }});

            if(teste){
                return res.status(200).json("atualizado com sucesso!");
            }
            else{
                return res.status(400).json("usuario nao autorizado");
            }



        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async deleteComment(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            let teste = true;
            const{ id } = req.params;

            await banco.query(`UPDATE public."News" SET "published"=true, "deletedAt"='2222-12-22' WHERE id = ${id};`);
            return res.status(200).json("deletado com sucesso!");
            

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async allNews(req: Request, res: Response){
        try {
            interface INews{
                id: number
                title: string
                subtitle: string
                content: string
                userId: number
            }

            let listNews: INews[] = [];

            //await redisClient.del('all_news');
            await banco.query(`SELECT n.id, n.title, n.subtitle, n.text, n."createdAt", n."updatedAt", n."userId", u."nickname"
            FROM public."News" as n
            inner join "User" as u
            on n."userId" = u.id
            where n.published=true and n."deletedAt" != '1111-11-11' order by n."updatedAt" desc`).then((res)=>{
                  listNews = []
                  res.rows.map((news)=>{
                    listNews.push(news)
                })
            });

            return res.status(200).json(listNews);
            
        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async newsDetails(req: Request, res: Response){
        try {
            interface INewDetails{
                id: number ,
                title: string,
                subtitle: string, 
                text: string,  
                updatedAt: Date, 
                userId: number,
                author: string,
                nickname: string,
                comment: string[],
                like: number,
                dislike: number
            }

            let objeto: INewDetails = {
                id: 0 ,
                title: '',
                subtitle: '', 
                text: '', 
                updatedAt: new Date(), 
                userId: 0,
                author: '',
                nickname: '',
                comment: [],
                like: 0,
                dislike: 0
              }
            //const queue = uuidv4();
            const { id } = req.params;  

            await banco.query(`SELECT c."comment" FROM public."News" as n
            join "Comment" as c
            on c."newId" = n.id
            where n.id = ${id}`).then((res)=>{
                objeto.comment = []
                res.rows.map((comment)=>{
                  objeto.comment.push(comment.comment);
                })
            });
    
            await banco.query(`select
            (select Count(id) as "LIKE" from "Reaction" where reaction = 'LIKED' and "newId" = ${id}) as Liked,
            (select Count(id) as "DISLIKE" from "Reaction" where reaction = 'DISLIKED' and "newId" = ${id}) as Disliked`).then((res)=>{
                objeto.like = res.rows[0].liked,
                objeto.dislike = res.rows[0].disliked
            });
    
            await banco.query(`SELECT n.id, n.title, n.subtitle, n.text, n."createdAt", n."updatedAt", n."userId", u.name, u.nickname
            FROM public."News" as n
            join "User" as u
            on n."userId" = u.id
            where n.id = ${id}`).then((res)=>{
                objeto.id = res.rows[0].id,
                objeto.title = res.rows[0].title,
                objeto.subtitle = res.rows[0].subtitle,
                objeto.text = res.rows[0].text,
                objeto.updatedAt = res.rows[0].updatedAt,
                objeto.userId = res.rows[0].userId,
                objeto.author = res.rows[0].name,
                objeto.nickname = res.rows[0].nickname
            });

            return res.status(200).json(objeto);
            
        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }   
    }

    public async authorNews(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            const { id } = req.params;
            interface INews{
                id: number,
                title: string,
                subtitle: string,
                content: string,
                createdAt: Date, 
                updatedAt: Date, 
                deletedAt: Date, 
                published: boolean,
                userId: number,
            }

            let listNews: INews[] = [];

            await banco.query(`select * from "News" where "userId" = ${id} order by "updatedAt" desc`).then((res)=>{
                listNews = [];
                res.rows.map((news)=>{
                  listNews.push(news);
                })
            });

            return res.status(200).json(listNews);
            
        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async newsAdmin(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            //console.log(queue);
            interface INews{
                id: number
                title: string
                subtitle: string
                content: string
                userId: number
            }
              
            let listNews: INews[] = [];

            await banco.query(`SELECT n.id, n.title, n.subtitle, n.text, n."createdAt", n."updatedAt", n."deletedAt", n.published, n."userId", u."nickname"
            FROM public."News" as n
            inner join "User" as u
            on n."userId" = u.id
            order by n."updatedAt" desc`).then((res)=>{
                listNews = []
                res.rows.map((news)=>{
                    listNews.push(news)
                    })
            });

            return res.status(200).json(listNews);

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async newsByNick(req: Request, res: Response){
        try {
            //const queue = uuidv4();
            const { nick } = req.params;

            interface INews{
                id: number
                title: string
                subtitle: string
                content: string
                userId: number
              }
              
              let listNews: INews[] = [];

            await banco.query(`SELECT n.id, n.title, n.subtitle, n.text, n."createdAt", n."updatedAt", n."userId", u."nickname"
            FROM public."News" as n
            inner join "User" as u
            on n."userId" = u.id
            where n.published=true and u.nickname = '${nick}' order by n."updatedAt" desc`).then((res)=>{
                listNews = []
                res.rows.map((news)=>{
                    listNews.push(news)
                    })
            });

            return res.status(200).json(listNews);

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }
}