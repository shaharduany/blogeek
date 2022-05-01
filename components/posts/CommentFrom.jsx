import { useRef, useState } from "react";
import Button from "../ui/Button";

function CommentForm(props){
    const [message, setMessage] = useState();
    const session = props.session;
    const contentInputRef = useRef();
    const postId = props.postId;

    const onSubmitHanlder = async(e) => {
        e.preventDefault();
        if(!session){
            setMessage("You must log in to reply");
        }

        const requestBody = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: contentInputRef.current.value,
                email: session.user.email,
                postId,
            }),
        };
        const req = await fetch("/api/posts/post-comment", requestBody);
        const json = await req.json();
        
        setMessage(json.message);
    }

    return (
        <div>
            {message && <label>{message}</label>}
            <form onSubmit={onSubmitHanlder}>
                <label htmlFor="content">Enter a comment</label>
                <textarea id="content" rows={3} ref={contentInputRef}/>
                <Button>SUBMIT</Button>
            </form>
        </div>
    )
}

export default CommentForm;