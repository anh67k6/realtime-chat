const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const databaseConnect = require('./config/database.js')
const authRouter = require('./routes/authRoutes.js')

databaseConnect();

app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/messenger', authRouter);

app.listen(PORT, ()=>{
    console.log("listening on port " + PORT);
})