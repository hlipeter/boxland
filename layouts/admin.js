import React, { Component } from "react";
import Head from "next/head";

export default class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const children = this.props.children;
    return (
      <React.Fragment>
        <Head>
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          <title>boxser的笔记</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/css/common.css" />
        </Head>
        {children}
      </React.Fragment>
    );
  }
}
