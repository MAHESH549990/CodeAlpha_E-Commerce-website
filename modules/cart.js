const mongoose=require("mongoose");
const {Schema}=mongoose;

const cartSchema=({
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
  description:{
    type:String,
    required:true,
  },
});

const Cart=mongoose.model("Cart",cartSchema);
module.exports=Cart;