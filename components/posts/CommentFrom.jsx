import { useSession } from "next-auth/react";
import { useRef } from "react";
import Button from "../ui/Button";

function CommentForm(props){
    const { data: session, status } = useSession();

    const contentInputRef = useRef();
    const postId = props.postId;

    const onSubmitHanlder = async(e) => {
        e.preventDefault();
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
        console.log(json);
    }

    return (
        <div>
            <form onSubmit={onSubmitHanlder}>
                <label htmlFor="content">Enter a comment</label>
                <textarea id="content" rows={3} ref={contentInputRef}/>
                <Button>SUBMIT</Button>
            </form>
        </div>
    )
}

export default CommentForm;