const express = require('express');
const app = express();
const dotenv = require('dotenv')
const databaseConnect = require('./config/database')
const userRouter = require('./routes/userRoute')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors")
dotenv.config({
     path : 'backend/config/config.env'
})

app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users',userRouter);

const PORT = process.env.PORT || 4000

app.get('/', (req, res)=>{
     res.send('This is from backend Sever')
})

databaseConnect();

app.listen(PORT, ()=>{
     console.log(`Server is running on port ${PORT}`)
})