import React, { Component } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicEditor = dynamic(import("../../components/bf-editor"), {
  ssr: false //这个要加上,禁止使用 SSR
});

export default class Edit extends Component {
  static getInitialProps({ query }) {
    return query;
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          <title>编辑</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/css/common.css" />
        </Head>
        <DynamicEditor {...this.props} />
      </React.Fragment>
    );
  }
}
