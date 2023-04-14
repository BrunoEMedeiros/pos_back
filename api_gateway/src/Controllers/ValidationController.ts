import { IMessage, Product } from "../product";

const productMessage: Product = new Product();

    export class ValidationController{
        public async validarEmails(){
          try {
            const message: IMessage = {
                key: "readers",
                payload: {}
            }
            
            await productMessage.sendMessage('emails', message);
          } catch (error) {
            console.log("Error to initial validate emails");
          }
        }

        public async validarAtivos(){
            try {
                const message: IMessage = {
                    key: "readers",
                    payload: {}
                }
                
                await productMessage.sendMessage('validate_activated', message);
            } catch (error) {
                console.log("Error to initial validate activates");
            }
        }
    }