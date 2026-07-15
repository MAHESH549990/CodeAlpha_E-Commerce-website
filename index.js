const express=require("express");
const app=express();
const path=require("path");
const port=8080;

app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


app.listen(port,()=>{
  console.log("Server is running...");
});

app.get("/",(req,res)=>{
  res.send("You're in the home page");
});


app.get("/login",(req,res)=>{
  res.render("login");
})