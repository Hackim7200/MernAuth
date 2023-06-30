import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();// make sure this is before db function or it cant access password
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5555;

connectDB();

const app = express();

app.use(express.json());                      // allows for the processing of json objects
app.use(express.urlencoded({extended:true})); // allows for the procrssing of form e.g., x-www-form-urlencoded chech post man
app.use(cookieParser())
//routes
app.use('/api/users', userRoutes);

if(process.env.NODE_ENV ==='production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    app.get('*',(req,res)=> res.sendFile(path.resolve(__dirname,'frontend','dist','index.html')));
}else{
    app.get('/',(req,res)=> res.send('server is ready'))

}

//custom middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));