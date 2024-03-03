import mongoose from "mongoose";
import initData from "./data.js";
import Info from "../models/info.js";


const MONGO_URL = "mongodb://127.0.0.1:27017/userdata";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  
  await Info.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
