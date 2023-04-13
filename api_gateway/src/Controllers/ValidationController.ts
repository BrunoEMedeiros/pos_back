import { IMessage, Product } from "../product";

const productMessage: Product = new Product();

    export class ValidationController{
        public async validarEmails(){
            const message: IMessage = {
                key: "readers",
                payload: {}
            }
            
            await productMessage.sendMessage('emails', message);
        }
    }