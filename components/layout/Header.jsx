import Link from "next/link";
import Button from "../ui/Button";
import { signOut, useSession } from 'next-auth/react';

function Header(props) {
    const { data: session, loading } = useSession();
    const logoutHandler = (e) => {
        e.preventDefault();
        signOut();
    }
  
    return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">HOME</Link>
          </li>
          {!session &&
          <li>
            <Link href="/login">LOGIN</Link>
          </li>
          }
          <li>
            <Link href="/signup">SIGNUP</Link>
          </li>
          {session && <Button onClick={logoutHandler}>LOGOUT</Button>}
        </ul>
      </nav>
    </div>
  );
}

export default Header;