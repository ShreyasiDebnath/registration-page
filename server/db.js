const  mongoose = require("mongoose");
const mongoURI= process.env.MONGO_URI
var db = mongoose.connection; 

db.on('error', function(err){
    console.log('No connection found', err);

});
const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
    console.log("connected to mongo");
}
module.exports = connectToMongo;
