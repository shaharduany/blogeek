import { getSession } from "next-auth/react";
import CommentComp from "../../components/posts/CommentComp";
import CommentForm from "../../components/posts/CommentFrom";
import PostView from "../../components/posts/PostView";
import getClient, { getComments, getPost } from "../../lib/db/db";

function SinglePostPage(props) {
	const post = JSON.parse(props.post);
	const error = JSON.parse(props.error);
	const comments = JSON.parse(props.comments);

	if (error) {
		console.log(props.error);
		return <h1>error</h1>;
	}
	return (
		<div>
			<PostView post={post} />
			<CommentForm postId={post.id} session={props.session} />
			{comments &&
				comments.map((value, index) => (
					<CommentComp
						key={index}
						sender={value.sender}
						content={value.content}
						date={value.date}
					/>
				))}
		</div>
	);
}

export async function getServerSideProps(context) {
	await getClient();
	const postId = context.query.postId;
	let post = {};
	let error = false;
	let comments = [];
	let session;
	try {
		post = await getPost(postId);
		session = await getSession(context);
		comments = await getComments(postId);
	} catch (err) {
		console.log(err);
		error = err;
	}

	return {
		props: {
			query: context.query.postId,
			post: JSON.stringify(post),
			error: JSON.stringify(error),
			session,
			comments,
		},
	};
}

export default SinglePostPage;
