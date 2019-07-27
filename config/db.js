const mongoose =require("mongoose");


 // global promiise
 mongoose.Promise=global.Promise;

// db connection..

mongoose.connect("mongodb+srv://jaymehta:mathsscholar@cluster0-hgngw.mongodb.net/test?retryWrites=true&w=majority")
.then(()=>console.log("MongoDb connection established.."))