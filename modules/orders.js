const mongoose=require("mongoose");
const {Schema}=mongoose;

const orderSchema=Schema({
  name:{
    type:String,
    required:true,
  },
  price,
});