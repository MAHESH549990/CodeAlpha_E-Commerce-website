const mongoose=require("mongoose");
const Cart=require("../modules/cart.js");

const MONGO_URL="mongodb://127.0.0.1:27017/E_Commerce";

main()
.then(()=>{
  console.log("Database connected");
})
.catch((err)=>{
  console.log(err);
});
async function main(){
  await mongoose.connect(MONGO_URL);
}

const initDB=async ()=>{
  await Cart.deleteMany({});
  console.log("Data was initialized");
}

initDB();
