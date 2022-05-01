import { useRouter } from "next/router";
import styles from './PostComp.module.scss';

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
    <div className={styles.post} onClick={postClickHanlder}>
      <div className={styles.titleDiv}>
        <h3>{title}</h3>
      </div>
      <div className={styles.publisherDiv}>
        <h5>{publisher}</h5>
        <time>{date}</time>
      </div>
      <div className={styles.contentDiv}>
        <p>{content}</p>
      </div>
      <div className={styles.commentsDiv}>
        <p>Comments: {comments.length}</p>
      </div>
    </div>
  );
}

export default PostComp;
