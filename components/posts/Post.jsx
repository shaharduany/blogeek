function PostComp(props) {
  const title = props.title;
  const content = props.content;
  const publisher = props.publisher;
  const date = new Date(props.date).toLocaleTimeString();
  if (!title || !date || !comment || !content) {
    return (
      <div>
        <h1>bla</h1>
      </div>
    );
  }
  return (
    <div>
      <h4>{title}</h4>
      <h5>{publisher}</h5>
      <span>{content}</span>
      <time>{date}</time>
    </div>
  );
}

export default PostComp;
