import mongoose from "mongoose";
import credentials from "./db-credentials";
import Posts from "./models/Post";
import User from './models/User';

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

async function postObj(id, title, content, userId, date) {
  const user = await User.findById(userId);
  const publisher = user.username;

  return {
    id,
    title,
    content,
    publisher,
    date,
  };
}

async function convertPosts(dbPosts) {
  let posts = [];

  for (let post of dbPosts) {
    let obj = await postObj(post._id, post.title, post.content, post.publisher, post.date);
    posts.push(obj);
  }

  return posts;
}

export async function getRecentPosts() {
  await getClient();

  let dbPosts;
  let posts;

  try {
    dbPosts = await Posts.find({}).sort({ _id: -1 }).limit(10);
  } catch (error) {
    console.log(error);
    return [`Error at try > ${error}`];
  }

  posts = await convertPosts(dbPosts);
  return JSON.stringify(posts);
}

export async function addPost(publisher, title, content) {
  const post = new Posts({
    publisher,
    title,
    content,
  });

  await post.save();

  return post;
}
