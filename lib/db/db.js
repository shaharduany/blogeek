import mongoose from "mongoose";
import credentials from "./db-credentials";
import Posts from "./models/Post";

const MONGODB_URI = credentials;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function getClient() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = await mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function getRecentPosts() {
  console.log('in getrecent');
  try{
    const posts =  await Posts.find({});
    console.log(posts);
    return posts;  
  }catch (error){
    console.log(error);
    return []
  }
}
