const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const ejsMate = require("ejs-mate");
const Product = require("./modules/products.js");
const Cart=require("./modules/cart.js");
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/E_Commerce";
const methodOverride = require("method-override");


app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


main().then(() => {
  console.log("Database connected");
})
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.listen(port, () => {
  console.log("Server is running...");
});

app.get("/", (req, res) => {
  res.send("You're in the home page");
});

//login,register route
app.get("/login", (req, res) => {
  res.render("login.ejs");
})
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/updatepassword", (req, res) => {
  res.render("newpassword.ejs");
});

//home route
app.get("/home", async (req, res) => {
  const allProducts = await Product.find({});
  res.render("home.ejs", { allProducts });
});

app.get("/home/:id", async (req, res) => {
    const item = await Product.findById(req.params.id);
    res.render("items.ejs", { item });
});

//cart

app.post("/home/:id", async (req, res) => {
  const { id } = req.params;
  let item = await Product.findById(id);
  console.log(item);
  const cartData=new Cart({
    name:item.name,
    price:item.price,
    image:item.image,
    description:item.description,
    rating:item.rating,
  });
  await cartData.save();
  res.redirect("/home");
});

app.get("/cart", async (req, res) => {
    const allItems = await Cart.find({});
    let price=0;
    for(let item of allItems){
      price+=item.price;
    }
    res.render("cart.ejs", { allItems,price});
});
