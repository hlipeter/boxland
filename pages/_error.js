import React from "react";
import Main from "../layouts/main";

export default function Error(props) {
  return (
    <Main>
      <div style={{ padding: "60px", textAlign: "center" }}>
        <p>
          {props.statusCode
            ? `An error ${props.statusCode} occurred on server`
            : "An error occurred on client"}
        </p>
      </div>
    </Main>
  );
}

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};
