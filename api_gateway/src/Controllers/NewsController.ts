import { Request, Response } from "express";
import { IMessage } from "../product";
import { Product } from "../product";

const productMessage: Product = new Product();

export class NewsController{
    public async createNews(req: Request, res: Response){
        try {
            const {   
                title ,
                subtitle , 
                content,
                userId
            } = req.body;

            const message: IMessage = {
                    key: "news",
                    payload: {
                        title ,
                        subtitle,
                        content,
                        userId
                    }
            }
    
            console.log(message);
            
            await productMessage.sendMessage('news', message);
    
            return res.status(200).json("Sending message...");
    
            } catch (error) {
                    console.log("Error route send message!");
                    return res.status(500).json("Error to send message...");
            }
    }

    public async updateNews(req: Request, res: Response){
        try {
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
                    key: "newsUpdate",
                    payload: {
                        id,
                        title ,
                        subtitle ,
                        content,
                        userId
                    }
            }
    
            await productMessage.sendMessage('newsUpdate', message);
    
            return res.status(200).json("Sending message...");
        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async publishNews(req: Request, res: Response){
        try {
            const{ id } = req.params;
            const message: IMessage = {
                key: "newsPublish",
                payload: id
                
            }

            await productMessage.sendMessage('newsPublish', message);

            return res.status(200).json("Sending message...");
        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async deleteNews(req: Request, res: Response) {
        try {
            const{ id } = req.params;
            const message: IMessage = {
                key: "newsDelete",
                payload: id
                
        }

        await productMessage.sendMessage('newsDelete', message);

        return res.status(200).json("Sending message...");
        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async reactionNews(req: Request, res: Response){
        try {
            const {   
                reaction
            } = req.body;

            const {userId } = req.body;
            const { id } = req.params;
    
            const message: IMessage = {
                key: "reactionsUpdate",
                payload: {
                    reaction ,
                    userId ,
                    id
                }
        }

        await productMessage.sendMessage('reactionsUpdate', message);

        return res.status(200).json("Sending message...");

        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async commentNews(req: Request, res: Response){
        try {
            const {   
                comment,
                userId,
                newId
            } = req.body;
    
            const message: IMessage = {
                key: "comments",
                payload: {
                    comment ,
                    userId ,
                    newId
                }
        }

        await productMessage.sendMessage('comments', message);

        return res.status(200).json("Sending message...");
        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async updateComment(req: Request, res: Response){
        try {
            const {   
                comment,
                userId,
                newId,
            } = req.body;

            const { id } = req.params;
    
            const message: IMessage = {
                key: "commentsUpdate",
                payload: {
                    id,
                    newId,
                    comment ,
                    userId
                }
        }

        await productMessage.sendMessage('commentsUpdate', message);

        return res.status(200).json("Sending message...");
        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }

    public async deleteComment(req: Request, res: Response){
        try {
            const{ id } = req.params;
            const message: IMessage = {
                key: "commentDelete",
                payload: id
                }

        await productMessage.sendMessage('commentDelete', message);

        return res.status(200).json("Sending message..."); 
        } catch (error) {
            console.log("Error route send message!");
            return res.status(500).json("Error to send message...");
        }
    }
}