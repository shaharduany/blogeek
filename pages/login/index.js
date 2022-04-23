import { getSession, signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";

function LoginPage(props){
    const [message, setMessage] = useState(false);
    
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const session = getSession();

    const submitHandler = async (e) => {
        e.preventDefault();

        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        const obj = {
            redirect: false,
            email,
            password,
        };

        const res = await signIn("credentials", obj);
        
        console.log(res);
    }

    useEffect(() => {}, []);

    return (<div>
        <h1>LOGIN PAGE</h1>
        {message && <label>{message}</label>}
        <form onSubmit={submitHandler}>
            <label htmlFor="email">Enter your email</label>
            <input id="email" type="email" ref={emailInputRef} />
            <br />
            <label htmlFor="password">Password: </label>
            <input id="password" type="password" ref={passwordInputRef} />
            <Button>SIGN IN</Button>
        </form>
    </div>);
}

export default LoginPage;