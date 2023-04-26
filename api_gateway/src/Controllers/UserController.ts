import { Request, Response } from "express";
import { IMessage } from "../product";
import { Product } from "../product";
import { v4 as uuidv4 } from 'uuid';
import { getRedis } from "../redis";

const productMessage: Product = new Product();

    export class UserController{
        public async createReader(req: Request, res: Response){
            try {
                const queue = uuidv4();
                const {   
                    name,
                    email,
                    nickname,
                    birthday,
                    password
                } = req.body;

                const message: IMessage = {
                    key: queue,
                    payload: {
                        name,
                        email,
                        nickname,
                        birthday,
                        password,
                        role: 'READER'
                    }
                }
                
                const validation = await productMessage.sendMessage('readers', message);
                if(validation == 0){
                    res.status(400).json('Email ou nickname ja em uso !');
                }else
                    res.status(200).json('Cadastrado com sucesso');
                
                } catch (error) {
                        console.log("Error route send message!");
                        return res.status(500).json("Error to send message...");
                }
        }
        public async createAuthor(req: Request, res: Response){
            try {
                const queue = uuidv4();
                const {   
                    name,
                    email,
                    nickname,
                    birthday,
                    password
                } = req.body;
        
                const message: IMessage = {
                        key: queue,
                        payload: {
                            name,
                            email,
                            nickname,
                            birthday,
                            password,
                            role: 'AUTHOR'
                        }
                }

                const validation = await productMessage.sendMessage('authors', message);
                if(validation == 0){
                    res.status(400).json('Email ou nickname ja em uso !');
                }else
                    res.status(200).json('Cadastrado com sucesso');

                } catch (error) {
                        console.log("Error route send message!");
                        return res.status(500).json("Error to send message...");
                }
        }
        public async createAdmin(req: Request, res: Response){
            try {
                const queue = uuidv4();
                const {   
                    name,
                    email,
                    nickname,
                    birthday,
                    password
                } = req.body;
        
                const message: IMessage = {
                        key: queue,
                        payload: {
                            name,
                            email,
                            nickname,
                            birthday,
                            password,
                            role: 'ADMINISTRATOR'
                        }
                }
        
                const validation = await productMessage.sendMessage('admin', message);
                if(validation == 0){
                    res.status(400).json('Email ou nickname ja em uso !');
                }else
                    res.status(200).json('Cadastrado com sucesso');

            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }
        public async activateUser(req: Request, res: Response){
            try {
                const queue = uuidv4();
                const {id} = req.params;
                const message: IMessage = {
                    key: queue,
                    payload: id
            }

            const validation = await productMessage.sendMessage('activate', message);
                if(validation == 0){
                    res.status(400).json('Email ja ativo!');
                }else
                    res.status(200).json('Ativado com sucesso');

            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }
        public async updateUser(req: Request, res: Response){
            try {
                const queue = uuidv4();
                const {id} = req.params;

                const {   
                    name,
                    nickname,
                    birthday
                } = req.body;
        
                const message: IMessage = {
                        key: queue,
                        payload: {
                            id,
                            name,
                            nickname,
                            birthday
                        }
                }
    
                const validation = await productMessage.sendMessage('usersUpdate', message);
                if(validation == 0){
                    res.status(400).json('Nickname ja em uso!');
                }else
                    res.status(200).json('Atualizado com sucesso');

            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }
        public async blockUser(req: Request, res: Response){
            try {
                const queue = uuidv4();
                const {id} = req.params;
                const message: IMessage = {
                    key: queue,
                    payload: id
            }

            const validation = await productMessage.sendMessage('usersBlock', message);
            if(validation == 0){
                res.status(400).json('Este usuario possui publicações, não é possivel excluir!');
            }else
                res.status(200).json('Bloqueado com sucesso!');

            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }
        public async allAuthors(req: Request, res: Response){
            try {
                const queue = uuidv4();
            //console.log(queue);
                const message: IMessage = {
                    key: queue,
                    payload: 0
                }   

            const validation = await productMessage.sendMessage('authorDetails', message);
            if(validation == 0){
                res.status(400).json('Erro!');
            }else{
                const data: any = await getRedis(queue);
                return res.status(200).json(JSON.parse(data));
            }        
                
            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");  
            }
        }
        public async login(req: Request, res: Response){
            try {
            
            const queue = uuidv4();
            const { nickname, password } = req.body;
            //console.log(queue);
                const message: IMessage = {
                    key: queue,
                    payload: {
                        nickname, 
                        password
                    }
                }   

            const validation = await productMessage.sendMessage('login', message);
            if(validation == 0){
                res.status(400).json('login invalido');
            }else{
                res.status(200).json('Logado!')
            }  

            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");  
            }
        }

        /*
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
        */
    }