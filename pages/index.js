import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

function HomePage() {
  const { data: session } = useSession();
  
  
  return (
    <Fragment>
      <h1>Welcome to BloGeek</h1>
      <h3>Number one blog for geeks</h3>
    </Fragment>
    );
}

export default HomePage;