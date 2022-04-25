import axios from "axios";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import PostComp from "../components/posts/Post";
import { getRecentPosts } from "../lib/db/db";

function HomePage(props) {
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
      <p>{typeof(posts)}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  try {
    const posts = await getRecentPosts();
    return {
      props: {
        posts,
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      props: {
        error: "Something went wrong at the server side, come back later",
        posts: [],
      },
      revalidate: 30,
    };
  }
}

export default HomePage;
