import { getToken } from "next-auth/jwt";
import User from "../../../lib/db/models/User";
import Posts from "../../../lib/db/models/Post";
import Comment from "../../../lib/db/models/Comment";
const SECRET = process.env.SECRET;

async function handler(req, res) {
	const { email, postId, content } = req.body;
	const validRequest = await validateRequest(req);

	if (!validRequest) {
		res.status(401).json({
			message: "Unauthorized request",
		});
		return;
	}

	const { publisher, post, error } = await getUserAndPost(email, postId);

	if (!user || !post || error) {
		res.status(500).json({
			message: "Could not get user or post",
			error,
		});
		return;
	}

	try {
		await createComment(publisher, post, content);
		res.status(201).json({
			saved: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Couldn't save content",
			error,
		});
	}
}

async function validateRequest(req) {
	const auth = await getToken(req, SECRET);
	const METHOD = req.method;
	if (method !== "POST" || !auth) {
		return false;
	}
	return true;
}

async function getUserAndPost(email, postId) {
	try {
		const user = await User.findOne({ email });
		const post = await Posts.findById(postId);
		return {
			publisher: user._id,
			post: post._id,
			error: false,
		};
	} catch (error) {
		return {
            post: false,
            publisher: false
			error,
		};
	}
}

async function createComment(publisher, post, content) {
	try {
		let comment = new Comment({
			publisher,
			post,
			content,
		});
		await comment.save();
	} catch (error) {
		throw error;
	}
}

export default handler;
