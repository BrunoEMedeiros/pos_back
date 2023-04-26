import express from 'express';
import { router } from './routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(router);
app.use(cors);

app.listen(8000, async ()=>{
    console.log("api_gateway running on 8000 port");
});
