import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

export default function Home() {
  const { data: session } = useSession();
  
  
  return (
    <Fragment>
      <h2>blabla</h2>
    </Fragment>
    )
}
