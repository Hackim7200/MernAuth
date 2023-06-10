import express from "express";
import dotenv from "dotenv"
dotenv.config()

//if there is env variable use that if not than use 5001
// 5001 is usually running  when developing have just downloaded fresh repo from git
// process.env.<variable> is given using the server after deployment
const port = process.env.PORT || 5001

const app = express();


app.listen(port, ()=>{
    console.log("---------server is running----------")
})