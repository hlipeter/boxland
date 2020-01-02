import React, { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import {
  Container,
  Typography,
  TextField,
  InputAdornment
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import fetch from "../public/js/nextFetch";
import "../public/css/about.less";

export default function Invitation() {
  const [code, setCode] = useState(null);
  const [toast, setToast] = useState(null);

  const gInvitationCode = async () => {
    console.log(code);
    if (code == "") {
      setCode("请输入邀请码！");
      return;
    }
    const result = await fetch(`users?code=${code}`);
    if (result.data && result.data.length === 0) {
      setCode("");
      setToast("请输入正确的邀请码！");
    } else {
      Router.push({
        pathname: "/about",
        query: { code, uid: result.data[0]["id"] }
      });
    }
  };

  const handleKeyup = e => {
    if (e.keyCode !== 13) return;
    gInvitationCode();
  };

  return (
    <React.Fragment>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>邀请码</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/css/common.css" />
      </Head>
      <div className="invitation">
        <Typography
          component="div"
          style={{
            backgroundColor: "rgb(19, 134, 226)",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <TextField
            id="outlined-basic"
            label="请输入邀请码"
            variant="outlined"
            autocomplete="off"
            onChange={e => setCode(e.target.value)}
            onKeyUp={handleKeyup}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ArrowRightAltIcon onClick={gInvitationCode} />
                </InputAdornment>
              )
            }}
          />
          <p style={{ color: "#ad2727", paddingTop: "10px" }}>{toast}</p>
        </Typography>
      </div>
    </React.Fragment>
  );
}
