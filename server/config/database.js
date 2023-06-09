const mongoose = require('mongoose');

const databaseConnect = () => {
    mongoose.connect("mongodb+srv://admin:ovjeqF9PZe750c8w@cluster0.jfsxizj.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(()=>{
        console.log("Database connection")
    }).catch(err => {
        console.log(err);
    })
}

module.exports = databaseConnect;