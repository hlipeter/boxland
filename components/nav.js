import React, { Component } from "react";
import Link from "next/link";
import jsCookie from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./styles.less";

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixBar: false,
      user: JSON.parse(jsCookie.get("userlogin") || null)
    };
  }

  useStyles() {
    return makeStyles(theme => ({
      button: {
        margin: theme.spacing(1)
      }
    }));
  }

  render() {
    const classed = this.useStyles();
    return (
      <nav className={this.props.fixBar ? "fix-header" : ""}>
        <div className="borderBack">
          <div className="container-mini">
            <Button className={classed.button}>
              <Link href="/">
                <a>首页</a>
              </Link>
            </Button>
            <Button className={classed.button}>
              <Link href="/tools">
                <a>工具箱</a>
              </Link>
            </Button>
            <Button className={classed.button}>
              <Link href="/about">
                <a>About me</a>
              </Link>
            </Button>
            <Button className={classed.button}>
              <Link href="https://github.com/hlipeter/boxland">
                <a>Github</a>
              </Link>
            </Button>

            <div className="loginBan">
              {this.state.user ? (
                <div className="loginName">
                  <Link href="/admin/index">
                    <a>欢迎，{this.state.user["username"]}</a>
                  </Link>
                </div>
              ) : (
                <Button className={classed.button}>
                  <Link href="/admin/login">
                    <a>登录</a>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
