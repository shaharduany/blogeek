import Head from "next/head";
import { Fragment } from "react";
import Footer from "./footer";
import Header from "./Header";

function Layout(props) {
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>Layout Title</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
          {props.children}
      </main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
