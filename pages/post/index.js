import { Fragment, useState, useEffect } from "react";
import PostComp from "../../components/posts/Post";
import { getRecentPosts } from "../../lib/db/db";
import Button from "../../components/ui/Button";

function PostPage(props) {
	const [posts, setPosts] = useState(props.posts);
	const [page, setPage] = useState(1);
	const [loaded, setLoaded] = useState(true);

	useEffect(() => {
		if (!loaded) {
			const req = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ page }),
			};
			fetch("/api/posts/request-posts", req)
				.then((req) => req.json())
				.then((data) => {
					setPosts(JSON.parse(data.posts));
				})
				.catch((err) => console.log(err));
		}

		setLoaded(false);
	}, [page]);

	const loadClickHandler = async (e) => {
		e.preventDefault();
		setPage(page++);
	}

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
				{posts.length % 10 === 0 && 
				<Button onClick={loadClickHandler}>LOAD MORE</Button>
				}
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
