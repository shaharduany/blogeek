import { Fragment, useState, useEffect } from "react";
import PostComp from "../../components/posts/Post";
import { getRecentPosts } from "../../lib/db/db";
import Button from "../../components/ui/Button";

function PostPage(props) {
	const [posts, setPosts] = useState(props.posts);
	const [page, setPage] = useState(2);
	const [flag, setFlag] = useState(true);

	const loadClickHandler = async (e) => {
		e.preventDefault();
		setPage(page + 1);
		const requestBody = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ page }),
		};

		const req = await fetch("/api/posts/request-posts", requestBody);
		const data = await req.json();

		const recPosts = JSON.parse(data.posts);

		if(recPosts.length === posts.length){
			setFlag(false);
		} else {
			setPosts(recPosts);
		}
	};

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
			<div>{flag && <Button onClick={loadClickHandler}>LOAD MORE</Button>}</div>
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
