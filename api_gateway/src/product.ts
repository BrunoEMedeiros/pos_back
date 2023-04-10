import client, {Channel ,Connection} from 'amqplib'

export interface IMessage{
    key: string,
    payload?: Object
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
            this.connection = await client.connect("amqp://guest:guest@172.16.238.10:5672");
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.log("Error to connect rabbitmq!: ", error);
        }
    }
    async sendMessage(type: string, obj: IMessage){
      try {

        if(!this.channel){
          await this.createConnect();
        }
        //types: news, comments, users
        await this.channel.assertQueue(type);
        //Send a message to the queue

        await this.channel.sendToQueue(type, Buffer.from(JSON.stringify({
            key: obj.key,
            payload: obj.payload
        })));
        
        console.log("Sending message...");
        return
      } catch (error) {
        console.log("Erro to send msg to queue!")
      }
    }
}