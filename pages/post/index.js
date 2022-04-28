import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import PostComp from "../../components/posts/Post";
import { getRecentPosts } from "../../lib/db/db";
import Button from "../../components/ui/Button";

function PostPage(props) {
	const [posts, setPosts] = useState(props.posts);
	const [page, setPage] = useState(1);
	
	useEffect(() => {
		const req = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ page }),
		};
		fetch("/api/posts/request-posts", req)
			.then((req) => req.json())
			.then((data) => console.log(data));
	}, [page]);

	const previousClickHandler = async (e) => {
		e.preventDefault();
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const nextClickHandler = async (e) => {
		setPage(page + 1);
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
			<div>
				<Button onClick={previousClickHandler}>PREV</Button>
				<p>{page}</p>
				<Button onClick={nextClickHandler}>NEXT</Button>
			</div>
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
