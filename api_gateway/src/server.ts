import express from 'express';
import { router } from './routes';
import { ValidationController } from './Controllers/ValidationController';

const validation = new ValidationController();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(router);

app.listen(8000, async ()=>{
    console.log("api_gateway running on 8000 port");
    await validation.validarEmails();
    await validation.validarAtivos();
});
