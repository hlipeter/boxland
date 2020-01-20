import React, { useState } from "react";
import Router from "next/router";
import {
  Button,
  Input,
  Typography,
  TextField,
  InputAdornment
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import AccountCircle from "@material-ui/icons/AccountCircle";
import jsCookie from "js-cookie";
import fetch from "../../public/js/nextFetch";
import Main from "../../layouts/admin";

export default function Login() {
  const [username, setName] = useState(null);
  const [password, setPwd] = useState(null);

  const checkLogin = async () => {
    if (!username || !password) {
      alert("不能为空!");
      return;
    }
    const result = await fetch(
      `user/login?username=${username}&password=${password}`
    );
    if (result.code === 200 && result.data.length) {
      jsCookie.set("userlogin", result.data[0], { expires: 3 }); // 三天过期
      Router.push({
        pathname: "/admin/index"
      });
    } else {
      alert("用户名或密码错误！");
    }
  };

  return (
    <Main>
      <div className="login">
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
          <Input
            placeholder="请输入用户名"
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <Input
            type="password"
            onChange={e => {
              setPwd(e.target.value);
            }}
            placeholder="请输入密码"
          />
          <Button
            onClick={checkLogin}
            variant="contained"
            color="primary"
            style={{ marginTop: "15px", width: "100px" }}
          >
            登录
          </Button>
        </Typography>
      </div>
    </Main>
  );
}
