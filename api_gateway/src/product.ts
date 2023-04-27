import client, {Channel ,Connection, Message} from 'amqplib'
export interface IMessage{
    key: string,
    payload?: Object
}

interface assertQ{
  queue: string,
  messageCount: number,
  consumerCount: number
}

export class Product{ 
    private connection: Connection | any;
    private channel: Channel | any;
    
    constructor(channel?: Channel, connection?: Connection){
      this.connection = connection ?? null
      this.channel = channel ?? null
    }

    async createConnect(){
      try {        
            this.connection = await client.connect("amqp://guest:guest@node135344-postgrad-backend.jelastic.saveincloud.net:5672");
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.log("Error to connect rabbitmq!: ", error);
        }
    }
    async sendMessage(type: string, obj: IMessage): Promise<number>{
      try {
        if(this.channel == null){
          await this.createConnect();
        }
        await this.channel.assertQueue(type, {durable: true});
        await this.channel.sendToQueue(type, Buffer.from(JSON.stringify(obj)));

        await this.channel.assertQueue(obj.key, {durable: false, autoDelete: true});
        const msg: number = await new Promise((resolve, reject) => {
          this.channel.consume(obj.key, async(msg: Message | null) => {
            if (msg) {
              let message = JSON.parse(msg.content.toString());

              this.channel.ack(msg);

              await this.channel.close();

              this.channel = null;  
              resolve(message.payload);
            }
          });
        });

        return msg;
      } catch (error) {
        console.log("Erro to send msg to queue!");
        return 0;
      }
    }
/*
    async consumeQueue(queue: string){      
      try {
          
          if(!this.channel){
            await this.createConnect();
          }
          // Makes the queue available to the client 
          await 
          });
        } catch (error) {
          console.log("Error to connect on queue");
        }
    }
*/
  }

