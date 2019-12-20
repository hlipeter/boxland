import React from "react";
import Moment from "react-moment";
import Main from "../layouts/main";
import fetch from "../public/js/nextFetch";

export default function POST(props) {
  const { initbiz } = props;
  return (
    <Main>
      <div className="container">
        <article className="markdown-body article">
          <div className="flex-box container-title">
            <div>
              <h2>{initbiz.title}</h2>
              <span className="tag">{initbiz.tagName}</span>
            </div>
            <div>
              <Moment format="YYYY-MM-DD">{initbiz.createTime}</Moment>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: initbiz.content }}></div>
        </article>
      </div>
    </Main>
  );
}
POST.getInitialProps = async ({ query }) => {
  const res = await fetch("post/" + query.id);
  return { initbiz: res.data[0] };
};
