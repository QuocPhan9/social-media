import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'

//Security package
import helmet from 'helmet'
import connectMongoDB from './db/index.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import router from './routes/index.js'

import {app, server} from './socket/socket.js'

const __dirname = path.resolve(path.dirname(""));

dotenv.config();

app.use(express.json());

app.use(express.static(path.join(__dirname, "views/build")));

const PORT = process.env.PORT || 5000;

connectMongoDB();

app.use(helmet());

app.use(
    cors({
        origin: "https://social-media-vert-eta.vercel.app", // Cho phép frontend truy cập
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended: true}));


app.use(morgan("dev"));
app.use(router);

//error middleware
app.use(errorMiddleware);


server.listen(PORT, () => {
    console.log(`Dev server running on port: ${PORT}`);
})