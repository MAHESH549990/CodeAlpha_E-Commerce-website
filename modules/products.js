const mongoose=require("mongoose");
const {Schema}=mongoose;

const productsSchema=Schema({
  name:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
    min:1,
  },
  image:{
    url:{
      type:String,
      required:true,
    },
    filename:{
      type:String,
      required:true,
    },
  },
  rating:{
    type:Number,
    required:true,
    min:1,
    max:5,
  },
});