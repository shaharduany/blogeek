import { useSession } from "next-auth/react";
import { useRef } from "react";
import { useState } from "react";
import Button from "../ui/Button";
import styles from "./PostBar.module.scss";

function PostBar(props) {
  const [message, setMessage] = useState();
	const session = props.session;
	const titleInputRef = useRef();
	const contentInputRef = useRef();

	const submitHandler = async (e) => {
		e.preventDefault();

    if(!session){
      setMessage("You must first log in to post a message");
      return;
    }

		const title = titleInputRef.current.value;
		const content = contentInputRef.current.value;
		const email = session.user.email;

		const values = {
			title,
			content,
			email,
		};

		const headers = {
			"Content-Type": "application/json",
		};

		const req = await fetch("/api/posts/post", {
			method: "POST",
			headers,
			body: JSON.stringify(values),
		});

		const data = await req.json();
		setMessage(data.message);
	};

	return (
		<div className={styles.outterDiv}>
      {message && <h5>{message}</h5>}
			<form onSubmit={submitHandler}>
				<div className={styles.inputsDiv}>
					<div className={styles.titleDiv}>
						<label htmlFor="title">Title</label>
						<input id="title" type="text" ref={titleInputRef} />
					</div>
					<div className={styles.contentDiv}>
						<label htmlFor="content">Content</label>
						<textarea
							id="content"
							type="textarea"
							ref={contentInputRef}
							rows={7}
						/>
					</div>
				</div>
				<div className={styles.buttonDiv}>
					<Button>POST</Button>
				</div>
			</form>
		</div>
	);
}

export default PostBar;
