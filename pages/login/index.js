import { getSession, signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import styles from "./login.module.css";

function LoginPage(props) {
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
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.login_div}>
      <h1>LOGIN PAGE</h1>
      {message && <label>{message}</label>}
      <form onSubmit={submitHandler} className={styles.login_form}>
        <div className={styles.login_inputs}>
          <label htmlFor="email">Email: </label>
          <input id="email" type="email" ref={emailInputRef} />
        </div>
        <div className={styles.login_inputs}>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" ref={passwordInputRef} />
        </div>
        <div className={styles.login_button}>
            <Button>SIGN IN</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
