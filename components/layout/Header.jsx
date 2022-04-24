import Link from "next/link";
import Button from "../ui/Button";
import { getSession, signOut, useSession } from "next-auth/react";
import style from "./header.module.css";

function Header(props) {
  const { data: session, loading } = useSession();
  const logoutHandler = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div className={style.header}>
      <nav>
        <ul className={style.links}>
          <div className={style.homelinks}>
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/post">POSTS</Link>
            </li>
          </div>
          {!session && (
            <div className={style.loglinks}>
              <li>
                <Link href="/login">LOGIN</Link>
              </li>
              <li>
                <Link href="/signup">SIGNUP</Link>
              </li>
            </div>
          )}
          {session && (
            <div className={style.loglinks}>
              <Button onClick={logoutHandler}>LOGOUT</Button>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default Header;
