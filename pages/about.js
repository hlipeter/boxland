import React, { useState, useEffect } from "react";
import Router from "next/router";
import Moment from "react-moment";
import jsCookie from "js-cookie";
import Main from "../layouts/main";
import fetch from "../public/js/nextFetch";
import "braft-editor/dist/output.css";

export default function About(props) {
  const { invalid, userlogin, uid } = props;
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (invalid && !userlogin) {
      Router.push({
        pathname: "/invitation"
      });
    } else {
      fetchUserCV(uid || userlogin.id);
    }
  }, [uid]);

  async function fetchUserCV(id) {
    const res = await fetch("user/resume?userId=" + id);
    setContent(res.data[0]["content"]);
  }

  return (
    <Main>
      <div className="container">
        <article className="personal-msg braft-output-content">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </article>
      </div>
    </Main>
  );
}

About.getInitialProps = async ({ query }) => {
  let thisProps = query;
  if (!query.code || !query.uid) {
    thisProps.invalid = true;
  }
  thisProps.userlogin = JSON.parse(jsCookie.get("userlogin") || null);
  return thisProps;
};
