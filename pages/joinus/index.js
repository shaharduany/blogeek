import { Fragment, useRef } from "react";

function JoinPage(props) {
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const username = usernameInputRef.current.value;

    const requestBody = JSON.stringify({
      email,
      username,
      password,
    });

    const res = await fetch("/api/auth/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const data = await res.json();

    console.log(data.message);
  };
  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Enter your email</label>
        <input id="email" type={"email"} ref={emailInputRef} />
        <label htmlFor="username">Enter your username</label>
        <input id="username" type="text" ref={usernameInputRef} />
        <label htmlFor="password">Enter your password</label>
        <input id="password" type="password" ref={passwordInputRef} />
        <button type="submit">SUBMIT</button>
      </form>
    </Fragment>
  );
}

export default JoinPage;
