function PostView(props) {
	const post = props.post;
	const date = new Date(post.date).toLocaleString();

	return (
		<div>
			<h2>{post.title}</h2>
			<h4>Author: {post.publisher}</h4>
			<h6>Published at {date}</h6>
			<p>{post.content}</p>
			<hr />
		</div>
	);
}

export default PostView;
