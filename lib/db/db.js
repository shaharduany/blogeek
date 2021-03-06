import mongoose from "mongoose";
import credentials from "./db-credentials";
import Posts from "./models/Post";
import User from "./models/User";
import Comment from './models/Comment';

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

async function postObj(id, title, content, userId, date, comments) {
	const user = await User.findById(userId);
	const publisher = user.username;

	return {
		id,
		title,
		content,
		publisher,
		date,
		comments,
	};
}

async function convertPosts(dbPosts) {
	let posts = [];

	for (let post of dbPosts) {
		let obj = await postObj(
			post._id,
			post.title,
			post.content,
			post.publisher,
			post.date,
			post.comments
		);
		posts.push(obj);
	}

	return posts;
}

export async function getRecentPosts() {
	const posts = await getPostsAtIndex(0, 10);
	return posts;
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

export async function getPostsAtIndex(start, end) {
	await getClient();

	let dbPosts;
	let posts;

	try {
		dbPosts = await Posts.find({}).sort({ _id: -1 }).limit(end);
	} catch (error) {
		console.log(error);
		return [`Error at try > ${error}`];
	}

	posts = await convertPosts(dbPosts);
	return JSON.stringify(posts);
}

export async function getPost(postId) {
	let post;
	let obj;

	try {
		post = await Posts.findById(postId);
		obj = await postObj(
			postId,
			post.title,
			post.content,
			post.publisher,
			post.date,
			post.comments
		);
	} catch (err) {
		return {};
	}

	return obj;
}

async function convertIdToComment(commentId) {
  let comment = await Comment.findById(commentId);
  
  return comment;
}

async function convertCommentToObj(unbox){
  let obj = {
    content: unbox.content,
    date: unbox.date,
  }
  let publisher = await User.findById(unbox.sender);
  obj.sender = publisher.username;

  return obj;
}

export async function getComments(postId) {
	const post = await Posts.findById(postId);
	let commentsIds = post.comments;
  let comments = [];

	for (let commentId of commentsIds) {
    let unbuiltComment = await convertIdToComment(commentId);
    let obj = await convertCommentToObj(unbuiltComment);
    comments.push(obj); 
  }

  return JSON.stringify(comments);
}
