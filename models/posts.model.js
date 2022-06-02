const mongoose=require('mongoose');

let postSchema=mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
title:{type:String,require:true},
desc:{type:String,require:true},
UserID:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
})

module.exports=mongoose.model('post',postSchema)