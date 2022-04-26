import axios from "axios";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import PostComp from "../components/posts/Post";
import PostBar from "../components/posts/PostBar";
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
      <PostBar />
    </Fragment>
  );
}


export default HomePage;
