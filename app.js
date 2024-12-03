import express from 'express';
import bodyParser from 'body-parser';
import AdminRouter from './routes/admin.routes.js';
import CategoryRouter from './routes/category.routes.js'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use("/admin", AdminRouter);
app.use("/category", CategoryRouter);

app.listen(3000, ()=>{
    console.log("Server started....");
});
