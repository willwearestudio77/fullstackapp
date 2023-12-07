import mongoose from "mongoose";


const { DB_URL = "mongodb://127.0.0.1:27017/products" } = process.env;

main().catch((err) => console.log(err));

export default async function main() {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB Connected");
  } catch (err) {
    console.error(err);
  }
}