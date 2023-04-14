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
                
                const emails = await getRedis('emails_test');

                if(emails){
                    const listaE = JSON.parse(emails);
                    let teste = listaE.find((test: any) => test === email);
                    if(teste){
                        return res.status(400).json("email ja em uso");
                    }
                }
                //console.log(lista);
                await productMessage.sendMessage('readers', message);
                return res.status(200).json("cadastrado com sucesso");
                
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
        
                const emails = await getRedis('emails_test');

                if(emails){
                    const listaE = JSON.parse(emails);
                    let teste = listaE.find((test: any) => test === email);
                    if(teste){
                        return res.status(400).json("email ja em uso");
                    }
                }
                //console.log(lista);
                await productMessage.sendMessage('readers', message);
                return res.status(200).json("cadastrado com sucesso");

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
        
                const emails = await getRedis('emails_test');

                if(emails){
                    const listaE = JSON.parse(emails);
                    let teste = listaE.find((test: any) => test === email);
                    if(teste){
                        return res.status(400).json("email ja em uso");
                    }
                }
                //console.log(lista);
                await productMessage.sendMessage('readers', message);
                return res.status(200).json("cadastrado com sucesso");

            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }

        public async activateUser(req: Request, res: Response){
            try {
                const {id} = req.params;
                const message: IMessage = {
                    key: "activate",
                    payload: id
            }

            await productMessage.sendMessage('activate', message);
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
                    birthday
                } = req.body;
        
                const message: IMessage = {
                        key: "usersUpdate",
                        payload: {
                            id,
                            name,
                            nickname,
                            birthday
                        }
                }

                const verificados = await getRedis('auth_users_test');

                if(verificados){
                    const listaA = JSON.parse(verificados);
                    let teste = listaA.find((test: any) => test == id);
                    if(!teste){
                        return res.status(400).json("conta não verificada!");
                    }
                }
    
                await productMessage.sendMessage('usersUpdate', message);
                return res.status(200).json("Sending message...");
            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }

        public async changeEmail(req: Request, res: Response){
            try {
                const {id} = req.params;
                const message: IMessage = {
                    key: "changeEmail",
                    payload: id
            }

            const verificados = await getRedis('auth_users_test');

                if(verificados){
                    const listaA = JSON.parse(verificados);
                    let teste = listaA.find((test: any) => test == id);
                    if(!teste){
                        return res.status(400).json("conta não verificada!");
                    }
                }

            await productMessage.sendMessage('changeEmail', message);
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
    
            const verificados = await getRedis('auth_users_test');

                if(verificados){
                    const listaA = JSON.parse(verificados);
                    let teste = listaA.find((test: any) => test == id);
                    if(!teste){
                        return res.status(400).json("conta não verificada!");
                    }
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

                const verificados = await getRedis('auth_users_test');

                if(verificados){
                    const listaA = JSON.parse(verificados);
                    let teste = listaA.find((test: any) => test == id);
                    if(!teste){
                        return res.status(400).json("conta não verificada!");
                    }
                }

                await productMessage.sendMessage('changePassword', message);
                return res.status(200).json("Sending message...");

            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }
    }