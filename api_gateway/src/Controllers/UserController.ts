import { Request, Response } from "express";
import { IMessage } from "../product";
import { Product } from "../product";
import { v4 as uuidv4 } from 'uuid';
import { DatabaseModel } from '../DatabaseModel';
import { criptografar, decrypt } from "./LoginController";
const banco = new DatabaseModel().pool;

const productMessage: Product = new Product();

    export class UserController{
        public async createReader(req: Request, res: Response){
            try {
                //const queue = uuidv4();
                const {   
                    name,
                    email,
                    nickname,
                    birthday,
                    password
                } = req.body;
                
                let teste = true;

                let hashPass: string = await criptografar(password);

                await banco.query(`SELECT id FROM public."User" 
                where email = '${email}' or nickname = '${nickname}'`).then(async (res)=>{
                //console.log(res);
                if(res.rowCount == 0){
                    await banco.query(`INSERT INTO public."User"(name, 
                    email, 
                    nickname, 
                    birthday, 
                    password, 
                    role, 
                    activated, 
                    "createdAt", 
                    "updatedAt", 
                    "deletedAt")
                    VALUES ('${name}', 
                    '${email}', 
                    '${nickname}', 
                    '${birthday}', 
                    '${hashPass}', 
                    'READER', 
                    true, 
                    '${new Date().toISOString()}', '${new Date().toISOString()}', '1111-11-11');`);
                    
                    teste = true;
                        
                }else{
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
        public async createAuthor(req: Request, res: Response){
            try {
                //const queue = uuidv4();
                const {   
                    name,
                    email,
                    nickname,
                    birthday,
                    password
                } = req.body;

                let teste = true;

                let hashPass: string = await criptografar(password);

                await banco.query(`SELECT id FROM public."User" 
                where email = '${email}' or nickname = '${nickname}'`).then(async (res)=>{
                //console.log(res);
                if(res.rowCount == 0){
                    await banco.query(`INSERT INTO public."User"(name, 
                    email, 
                    nickname, 
                    birthday, 
                    password, 
                    role, 
                    activated, 
                    "createdAt", 
                    "updatedAt", 
                    "deletedAt")
                    VALUES ('${name}', 
                    '${email}', 
                    '${nickname}', 
                    '${birthday}', 
                    '${hashPass}', 
                    'AUTHOR', 
                    true, 
                    '${new Date().toISOString()}', '${new Date().toISOString()}', '1111-11-11');`);
                
                   teste = true;
                }else{
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
        public async createAdmin(req: Request, res: Response){
            try {
                //const queue = uuidv4();
                const {   
                    name,
                    email,
                    nickname,
                    birthday,
                    password
                } = req.body;

                let teste = true;
                
                let hashPass: string = await criptografar(password);

                await banco.query(`SELECT id FROM public."User" 
                where email = '${email}' or nickname = '${nickname}'`).then(async (res)=>{
                  //console.log(res);
                  if(res.rowCount == 0){
                    await banco.query(`INSERT INTO public."User"(name, 
                      email, 
                      nickname, 
                      birthday, 
                      password, 
                      role, 
                      activated, 
                      "createdAt", 
                      "updatedAt", 
                      "deletedAt")
                      VALUES ('${name}', 
                      '${email}', 
                      '${nickname}', 
                      '${birthday}', 
                      '${hashPass}', 
                      'ADMINISTRATOR', 
                      true, 
                      '${new Date().toISOString()}', '${new Date().toISOString()}', '1111-11-11');`);
                  
                    teste = true;

                  }else{
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
        public async activateUser(req: Request, res: Response){
            try {
                //const queue = uuidv4();
                const {id} = req.params;
                await banco.query(`UPDATE public."User" SET activated = true WHERE id = ${id};`);
                return res.status(200).json("usuario ativado!");
            } catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }
        public async updateUser(req: Request, res: Response){
            try {
                //const queue = uuidv4();
                const {id} = req.params;

                const {   
                    name,
                    nickname,
                    birthday
                } = req.body;

                let teste = true;

                await banco.query(`SELECT id FROM public."User" where nickname = '${nickname}'`).then(async (res)=>{
                    //console.log(res);
                    if(res.rowCount == 0){
          
                      await banco.query(`UPDATE public."User"
                      SET name='${name}', 
                      nickname='${nickname}', 
                      birthday='${birthday}',
                      "updatedAt"='${new Date().toISOString()}'
                      WHERE id = ${id};`);
          
                      teste = true; 
                    }else{
                      teste = false;
                    }});

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
        public async blockUser(req: Request, res: Response){
            try {
                //const queue = uuidv4();
                const {id} = req.params;
                let teste = true;
                await banco.query(`select id from "News" where "userId" = ${id} and published = true`).then(async (res)=>{
                    if(res.rowCount == 0){
                      await banco.query(`UPDATE public."User" SET activated = false, "deletedAt"='${new Date().toISOString()}' 
                      WHERE id = ${id};`);
                        teste = true;
                    }else{
                        teste = false;
                    }
                });
                
                if(teste){
                    return res.status(200).json("criado com sucesso!");
                }
                else{
                    return res.status(400).json("usuario nao autorizado");
                }   

            }catch (error) {
                console.log("Error route send message!");
                return res.status(500).json("Error to send message...");
            }
        }
        public async allAuthors(req: Request, res: Response){
            try {
                interface IDetails{
                    id: number,
                    name: string,
                    nickname: string,
                    quant: number
                  }
                  
                  
                let listNews: IDetails[] = [];

                await banco.query(`SELECT 
                u.id, u.name, u.nickname,
                count(n.id) as QUANT
                FROM "User" as u
                INNER JOIN "News" as n ON u.id = n."userId"
                    where n.published = true
                GROUP BY u.id`).then((res)=>{
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
        public async login(req: Request, res: Response){
            try {
            
            //const queue = uuidv4();
            const { nickname, password } = req.body;
            let teste = true;
            let id = 0;

            await banco.query(`select id, password from "User" where nickname = '${nickname}'`).then(async (res)=>{
                if(res.rowCount != 0){
                   let desPass = await decrypt(res.rows[0].password);
                   if(password == desPass){
                    teste = true;
                    id = res.rows[0].id
                   }
                   else{
                    teste = false;
                   }
                }
            });

            if(teste){
                return res.status(200).json(`${id}`);
            }
            else{
                return res.status(400).json('Usuario ou senha incorreta');
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