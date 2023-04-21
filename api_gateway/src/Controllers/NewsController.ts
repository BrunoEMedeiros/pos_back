import { Request, Response } from "express";
import { IMessage } from "../product";
import { Product } from "../product";
import { getRedis } from "../redis";
import { v4 as uuidv4 } from 'uuid';

const productMessage: Product = new Product();
let listAutores: object[] = [];
let listAutorizados: object[] = [];

export class NewsController{
    
    public async createNews(req: Request, res: Response){
        try {
            const queue = uuidv4();
            const {   
                title ,
                subtitle , 
                content,
                userId
            } = req.body;

            const message: IMessage = {
                    key: queue,
                    payload: {
                        title ,
                        subtitle,
                        content,
                        userId
                    }
            }
            
            const validation = await productMessage.sendMessage('news', message);
            if(validation == 0){
                res.status(400).json('Este usuario não pode realizar esta operação');
            }else
                res.status(200).json('Cadastrado com sucesso');
            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
    }

    public async updateNews(req: Request, res: Response){
        try {
            const queue = uuidv4();
            const{ id } = req.params;
            const {   
                title ,
                subtitle , 
                content,
                userId
            } = req.body;
    
            let author = req.body;
    
            author = parseFloat(author);
    
            const message: IMessage = {
                    key: queue,
                    payload: {
                        id,
                        title ,
                        subtitle ,
                        content,
                        userId
                    }
            }

            const validation = await productMessage.sendMessage('newsUpdate', message);
            if(validation == 0){
                res.status(400).json('Este usuario não pode realizar esta operação');
            }else
                res.status(200).json('Cadastrado com sucesso');

        }catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async publishNews(req: Request, res: Response){
        try {
            const queue = uuidv4();
            const{ id } = req.params;
            const message: IMessage = {
                key: queue,
                payload: id
                
            }
            
            const validation = await productMessage.sendMessage('newsPublish', message);
            if(validation == 0){
                res.status(400).json('Este usuario não pode realizar esta operação');
            }else
                res.status(200).json('Publicada com sucesso');

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async deleteNews(req: Request, res: Response) {
        try {
            const queue = uuidv4();
            const{ id } = req.params;
            const message: IMessage = {
                key: queue,
                payload: id     
            }

            const validation = await productMessage.sendMessage('newsDelete', message);
            if(validation == 0){
                res.status(400).json('Esta noticia não pode ser excluida!');
            }else
                res.status(200).json('Excluida com sucesso!');

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async reactionNews(req: Request, res: Response){
        try {
            const queue = uuidv4();
            const { id } = req.params;
            const {   
                reaction,
                userId
            } = req.body;

            const message: IMessage = {
                key: queue,
                payload: {
                    reaction ,
                    userId ,
                    id
                }
        }

        const validation = await productMessage.sendMessage('reactions', message);
        if(validation == 0){
            res.status(400).json('Este usuario não pode realizar esta operação');
        }else
            res.status(200).json('Reacted!');

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async reactionUpdate(req: Request, res: Response){
        try {
            const queue = uuidv4();
            const { id } = req.params;

            const {   
                reaction,
                userId
            } = req.body;

        
            const message: IMessage = {
                key: queue,
                payload: {
                    reaction ,
                    userId ,
                    id
                }
        }

        const validation = await productMessage.sendMessage('reactionsUpdate', message);
        if(validation == 0){
            res.status(400).json('Este usuario não pode realizar esta operação');
        }else
            res.status(200).json('Reacted!');

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async commentNews(req: Request, res: Response){
        try {
            const queue = uuidv4();
            const {   
                comment,
                userId,
                newId
            } = req.body;
    
            const message: IMessage = {
                key: queue,
                payload: {
                    comment ,
                    userId ,
                    newId
                }
        }

        const validation = await productMessage.sendMessage('comments', message);
        if(validation == 0){
            res.status(400).json('Este usuario não pode realizar esta operação');
        }else
            res.status(200).json('Commented!');

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async updateComment(req: Request, res: Response){
        try {
            const queue = uuidv4();
            const {   
                comment,
                userId,
                newId,
            } = req.body;

            const { id } = req.params;
    
            const message: IMessage = {
                key: queue,
                payload: {
                    id,
                    newId,
                    comment,
                    userId
                }
            }

        const validation = await productMessage.sendMessage('commentsUpdate', message);
        if(validation == 0){
            res.status(400).json('Este usuario não pode realizar esta operação');
        }else
            res.status(200).json('Commented!');

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async deleteComment(req: Request, res: Response){
        try {
            const queue = uuidv4();
            const{ id } = req.params;

            const message: IMessage = {
                key: queue,
                payload: {id}
                }

            const validation = await productMessage.sendMessage('commentDelete', message);
            if(validation == 0){
                res.status(400).json('Este usuario não pode realizar esta operação');
            }else
                res.status(200).json('Comment deleted!');

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }
}