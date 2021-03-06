import axios from "axios";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import PostComp from "../components/posts/Post";
import PostBar from "../components/posts/PostBar";
import getClient, { getRecentPosts } from "../lib/db/db";

function HomePage(props) {
  const { data: session, status } = useSession();
  const posts = props.posts;
  const error = props.error;

  if (error) {
    return (
      <Fragment>
        <h1>Welcome to bloGeek</h1>
        <h3>{error}</h3>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h1>Welcome to BloGeek</h1>
      <h3>Number one blog for geeks</h3>
      <PostBar session={session}/>
      {posts.map((value, index) => (
        <div key={index}>
          <PostComp
            title={value.title}
            id={value.id}
            content={value.content}
            publisher={value.publisher}
            date={value.date}
            comments={value.comments}
          />
          <hr />
        </div>
      ))}
    </Fragment>
  );
}

export async function getStaticProps(context) {
  await getClient();
  let posts = await getRecentPosts();
  let error = false;

  if (!posts) {
    error = "Problem with getting recent posts";
    posts = [];
  }

  return {
    props: {
      posts: JSON.parse(posts),
      error,
    },
  };
}

export default HomePage;
