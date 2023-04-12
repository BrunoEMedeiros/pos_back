import { Request, Response } from "express";
import { IMessage } from "../product";
import { Product } from "../product";
import { getRedis, redisClient } from "../redis";

const productMessage: Product = new Product();
    export class UserController{
        public async createReader(req: Request, res: Response){
            try {
                const {   
                    name,
                    email,
                    nickname,
                    birthday,
                    password
                } = req.body;

                const validacao = await getRedis('validation');
                if(validacao != null){
                    redisClient.del('validation');
                    return res.status(400).json("Email ja em uso!"); 
                }else{
                    const message: IMessage = {
                        key: "readers",
                        payload: {
                            name,
                            email,
                            nickname,
                            birthday,
                            password,
                            role: 'READER'
                        }
                    }
                    
                await productMessage.sendMessage('readers', message);
                return res.status(200).json("Sending message...");
                }
                } catch (error) {
                        console.log("Error route send message!");
                        return res.status(500).json("Error to send message...");
                }
        }
        public async createAuthor(req: Request, res: Response){
            try {
                const {   
                    name,
                    email,
                    nickname,
                    birthday,
                    password
                } = req.body;
        
                const message: IMessage = {
                        key: "authors",
                        payload: {
                            name,
                            email,
                            nickname,
                            birthday,
                            password,
                            role: 'AUTHOR'
                        }
                }
        
                await productMessage.sendMessage('authors', message);
        
                return res.status(200).json("Sending message...");
        
                } catch (error) {
                        console.log("Error route send message!");
                        return res.status(500).json("Error to send message...");
                }
        }
        public async createAdmin(req: Request, res: Response){
            try {
                const {   
                    name,
                    email,
                    nickname,
                    birthday,
                    password
                } = req.body;
        
                const message: IMessage = {
                        key: "admin",
                        payload: {
                            name,
                            email,
                            nickname,
                            birthday,
                            password,
                            role: 'ADMINISTRATOR'
                        }
                }
        
                await productMessage.sendMessage('admin', message);
        
                return res.status(200).json("Sending message...");
            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }

        public async updateUser(req: Request, res: Response){
            try {
                
                const {id} = req.params;

                const {   
                    name,
                    nickname,
                    birthday,
                    password
                } = req.body;
        
                const message: IMessage = {
                        key: "usersUpdate",
                        payload: {
                            id,
                            name,
                            nickname,
                            birthday,
                            password
                        }
                }
        
                await productMessage.sendMessage('usersUpdate', message);
        
                return res.status(200).json("Sending message...");
            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }

        public async blockUser(req: Request, res: Response){
            try {
                const {id} = req.params;
                const message: IMessage = {
                    key: "usersBlock",
                    payload: id
            }
    
            await productMessage.sendMessage('usersBlock', message);
    
            return res.status(200).json("Sending message...");
            
            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }

        public async changePassword(req: Request, res: Response){
            try {
                const {id} = req.params;
                const message: IMessage = {
                    key: "changePassword",
                    payload: id
                }

                await productMessage.sendMessage('changePassword', message);
    
                return res.status(200).json("Sending message...");

            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }
    }