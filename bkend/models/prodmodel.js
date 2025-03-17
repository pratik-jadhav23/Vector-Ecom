let mongoose=require("mongoose")
let prodsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "cat":String,
    "price":Number,
    "desc":String,
    "pimg":String,
    "comm":[{"name":String,"text":String,"rt":Number}]   
})
let pm=new mongoose.model("prod",prodsch)
module.exports=pm