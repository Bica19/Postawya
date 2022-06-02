const mongoose=require('mongoose');

let indexSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fname:{type:String,require:true},
    lname:{type:String,require:true},
    username:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
})

const indexModel=mongoose.model('user',indexSchema)
module.exports=indexModel