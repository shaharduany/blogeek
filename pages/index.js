import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

function HomePage() {
  const { data: session } = useSession();
  
  
  return (
    <Fragment>
      <h2>blabla</h2>
    </Fragment>
    );
}

export default HomePage;