const express=require("express");
const app=express();
const path=require("path");
const port=8080;
const ejsMate=require("ejs-mate");
const Product=require("./modules/products.js");
const mongoose=require("mongoose");
const MONGO_URL="mongodb://127.0.0.1:27017/E_Commerce";



app.engine("ejs",ejsMate);

app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


main().then(()=>{
  console.log("Database connected");
})
.catch((err)=>{
  console.log(err);
});
async function main(){
  await mongoose.connect(MONGO_URL);
}

app.listen(port,()=>{
  console.log("Server is running...");
});

app.get("/",(req,res)=>{
  res.send("You're in the home page");
});

//login,register route
app.get("/login",(req,res)=>{
  res.render("login.ejs");
})
app.get("/register",(req,res)=>{
  res.render("register.ejs");
});
app.get("/updatepassword",(req,res)=>{
  res.render("newpassword.ejs");
});

//home route
app.get("/home",async(req,res)=>{
  const allProducts= await Product.find({});
  res.render("home.ejs",{allProducts});
});

app.get("/home/:id",async(req,res)=>{
  const {id}=req.params;
  let item=await Product.findById(id);
  res.render("items.ejs",{item});
});

//cart
