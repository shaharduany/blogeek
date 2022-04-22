import mongoose from "mongoose";
import credentials from "./db-credentials";

async function getClient(){
    let db = await mongoose.connect(credentials);
    
    return db;
}

export default getClient;
