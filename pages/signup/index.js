import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react"
import { useState } from "react/cjs/react.production.min";
import Button from "../../components/ui/Button";

function SignupPage(props){
    const router = useRouter();

    const [message, setMessage] = useState();
    const session = props.session;

    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    
    if(session){
        return (<div>
            <h1>You're already a signed in member</h1>
        </div>);
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const username = usernameInputRef.current.value;

        const headers = {
            "Content-Type": "application/json",
        };

        const obj = {
            email,
            password,
            username,
        };
        try {
            const res = await axios.post("/api/auth/signup", obj, { headers, });
            setMessage(res.message);
            if(res.created){
                setTimeout(() => {
                    router.push("/login");
                }, 3000)
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div>
            <h1>SIGN UP</h1>
            {message && <h5>{message}</h5>}
            <form onSubmit={submitHandler}>
                <label htmlFor="username">Enter your username</label>
                <input id="username" type="text" ref={usernameInputRef} />
                <br />
                <div>
                    <label htmlFor="email">
                        Enter your email
                    </label>
                    <input id="email" type="email" ref={emailInputRef} />
                </div>
                <br /> 
                <div>
                    <label htmlFor="password">
                        Enter your password
                    </label>
                    <input id="password" type="password" ref={passwordInputRef} />
                </div>
                <br />
                <Button>SIGN UP</Button>
            </form>
        </div>
    )    
}

export async function getServerSideProps(context){
    const session = await getSession(context);

    return {
        props: {
            session
        }
    };
}

export default SignupPage;