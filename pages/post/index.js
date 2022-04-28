import axios from "axios";
import { Fragment, useState } from "react";
import PostComp from "../../components/posts/Post";
import { getRecentPosts } from "../../lib/db/db";

function PostPage(props) {
	let posts = props.posts;
	const [page, setPage] = useState(1);

	return (
		<Fragment>
			<h1>POST PAGE</h1>
			{posts &&
				posts.map((value, index) => (
					<div key={index}>
						<PostComp
							id={value.id}
							title={value.title}
							content={value.content}
							publisher={value.publusher}
							date={value.date}
							comments={value.comments}
						/>
					</div>
				))}
		</Fragment>
	);
}

export async function getStaticProps(context) {
	let posts = await getRecentPosts();
	posts = JSON.parse(posts);

    
	return {
		props: {
			posts,
		},
		revalidate: 30,
	};
}

export default PostPage;
