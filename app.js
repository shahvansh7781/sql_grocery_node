const express = require('express');
const userRoute = require('./routes/userRouter');
const dbconnection = require('./config/dbConnection');
const cors = require('cors')
const dotenv = require('dotenv');

const app = express();

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}));

dotenv.config({path:"config/config.env"});
dbconnection();

app.use("/myapp",userRoute);

app.listen(5000,()=>{
    console.log("Server is running at port 5000");
})