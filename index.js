import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from './router/bookRoute.js'
import cors from "cors"
const app = express()
app.use(bodyParser.json());
app.use(cors())
const connection = mongoose.connection;

connection.once("connected", () => console.log("Connected to DATABASE"))
connection.on("ERROR", () => console.log("Connection Failed"))
mongoose.connect("mongodb+srv://abubakar59132:I7LH0thBHCxItJVX@cluster0.mkz5bdi.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/book", router);
app.listen(9000)