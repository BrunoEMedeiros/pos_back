import express from 'express';
import client, {Connection, Channel, ConsumeMessage} from 'amqplib'
import { DatabaseModel } from './DatabaseModel';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const banco = new DatabaseModel().pool;

export interface News{
  title: string
  subtitle: string
  content: string
  userId: number
}

// consumer for the queue.
// We use currying to give it the channel required to acknowledge the message
const consumer = (channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
  if (msg) {
    // Display the received message
    console.log(msg.content.toString());
    let noticia = JSON.parse(msg.content.toString());
    console.log(noticia);
    channel.ack(msg);
  }
  else{
    console.log("vazio")
  }
}

const connection: Connection = await client.connect("amqp://guest:guest@172.22.67.77:5672")
// Create a channel
const channel: Channel = await connection.createChannel()
// Makes the queue available to the client
await channel.assertQueue('news')
// Start the consumer
await channel.consume('news', consumer(channel));

app.listen(3000,()=>{console.log("ms running on 3000 port")});
    