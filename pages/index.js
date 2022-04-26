import axios from "axios";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import PostComp from "../components/posts/Post";
import PostBar from "../components/posts/PostBar";
import getClient, { getRecentPosts } from "../lib/db/db";

function HomePage(props) {
  const posts = props.posts;

  const error = props.error;

  console.log(posts);

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
      <PostBar />
      {posts.map((value, index) => (
        <div>
          <PostComp
            title={value.title}
            id={value.id}
            content={value.content}
            publisher={value.publisher}
            date={value.date}
            key={index}
          />
        </div>
      ))}
    </Fragment>
  );
}

export async function getStaticProps(context) {
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
