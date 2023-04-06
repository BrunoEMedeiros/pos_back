import express from 'express';
import { router } from './routes';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(router);

app.listen(8000,()=>{
    console.log("api_gateway running on 8000 port");
});
