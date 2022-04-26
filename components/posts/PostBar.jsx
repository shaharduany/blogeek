import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import Button from "../ui/Button";

function PostBar(props) {
    const { data: session, status } = useSession();
    const titleInputRef = useRef();  
  const contentInputRef = useRef();

    const submitHandler = async(e) => {
        e.preventDefault();
        if(!session){
            console.log("!session");
            return;
        }
        const title = titleInputRef.current.value;
        const content = contentInputRef.current.value;
        const email = session.user.email;

        const values = {
            title,
            content,
            email,
        }

        const headers = {
            "Content-Type": "application/json"
        };
        
        const req = await fetch("/api/posts/post", {
            method: "POST",
            headers,
            body: JSON.stringify(values),
        });
       
        const data = await req.json();
        console.log(data);
    }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" ref={titleInputRef} />
        </div>
        <div>
            <label htmlFor="content">Content</label>
            <input id="content" type="textarea" ref={contentInputRef} />
        </div>
        <div>
            <Button>POST</Button>
        </div>
      </form>
    </div>
  );
}

export default PostBar;