const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const Vote=require("../models/Vote");

// get from  pushr website dashboard/get started.. in your application
const Pusher =require("pusher");
 
var channels_client = new Pusher({
    appId: '831246',
    key: '9bbbdb8df23bad0517d8',
    secret: '7343c9bcb76fb6b7a28b',
    cluster: 'ap2',
    encrypted: true
  });


router.get("/",(req,res)=>{// this will mange the storinf and displaying previous vote data.
   Vote.find().then(votes=>res.json({success:true,votes:votes}));
   
})

// handling the post request...
router.post("/",(req,res)=>{ // on submit the  clicked os and point will go to newVote,call scheme, save new vote it will return the response as promise and then we will trigger the  evnets and ass the response from the promise

const newvote={
  os:req.body.os,
  points:1
}

new Vote(newvote).save().then(vote=>{ // creates a new vote doc and return the json

  channels_client.trigger('os-poll', 'os-vote', {  //from website only..
    points:parseInt(vote.points),
    os:vote.os
   });

   return res.json({success:true,message:"HelloWorld"})

})

   
})


module.exports=router;