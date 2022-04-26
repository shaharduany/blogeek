import { useRouter } from "next/router";

function PostComp(props) {
    const router = useRouter();

    const title = props.title;
  const content = props.content;
  const publisher = props.publisher;
  const date = new Date(props.date).toLocaleString();
    const id = props.id;
    
  const postClickHanlder = async(e) => {
    e.preventDefault();
    router.push(`/posts/${id}`);
  }

  if (!title || !date || !content || !content) {
    return (
      <div>
        <h1>bla</h1>
      </div>
    );
  }

  return (
    <div onClick={postClickHanlder}>
      <h3>{title}</h3>
      <h5>{publisher}</h5>
      <p>{content}</p>
      <time>{date}</time>
    </div>
  );
}

export default PostComp;
