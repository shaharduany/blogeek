import { useRouter } from "next/router";

function PostComp(props) {
  const router = useRouter();

  const title = props.title;
  const content = props.content;
  const publisher = props.publisher;
  const date = new Date(props.date).toLocaleString();
  const id = props.id;
  const comments = props.comments;

  const postClickHanlder = async (e) => {
    e.preventDefault();
    router.push(`/post/${id}`);
  };

  if (!title || !date || !content || !content || !comments) {
    return (
      <div>
        <h1>PostComp wasn't well writtent</h1>
      </div>
    );
  }

  return (
    <div onClick={postClickHanlder}>
      <h3>{title}</h3>
      <h5>{publisher}</h5>
      <p>{content}</p>
      <time>{date}</time>
      <p>Comments: {comments.length}</p>
    </div>
  );
}

export default PostComp;
