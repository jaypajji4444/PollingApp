const mongoose=require("mongoose");
    const Schema=mongoose.Schema;

     const VoteSchema= new  Schema({
         os:{
             type:String,
             required:true
         },
         points:{
             type:String,
             required:true
         }
     })

     //  create a collection and add schema..

     const Vote=mongoose.model("Vote",VoteSchema);

     module.exports=Vote;