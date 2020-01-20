import React from "react";
import Container from "@material-ui/core/Container";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Nav from "../components/nav";
import Footer from "../components/footer";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

export default function Main(props) {
  return (
    <React.Fragment>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>boxser的笔记</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/css/markdown.css" />
        <link rel="stylesheet" href="/css/common.css" />
      </Head>
      <HideOnScroll {...props}>
        <AppBar color="inherit">
          <Nav />
        </AppBar>
      </HideOnScroll>
      <Container className="mix-container" maxWidth="md">
        {props.children}
      </Container>
      <Footer />
    </React.Fragment>
  );
}
