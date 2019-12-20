import React, { useState } from "react";
import Link from "next/link";
import {
  Grid,
  Button,
  Box,
  TextField,
  InputAdornment,
  Icon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Moment from "react-moment";
import jsCookie from "js-cookie";
import fetch from "../public/js/nextFetch";
import Main from "../layouts/main";
import Empty from "../components/empty";
// import "../public/css/index.less";

export default function Home(props) {
  const [postData, setPostData] = useState(props.lists);
  const user = JSON.parse(jsCookie.get("userlogin") || null);

  const handleTag = async str => {
    const res = await fetch(`post?type=${str}`);
    setPostData(res.data);
  };
  const searchData = async () => {};

  return (
    <Main>
      <Grid container spacing={1}>
        <Box
          style={{ width: "100%" }}
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          marginTop="40px"
        >
          <Box m={1}>
            <Button onClick={() => handleTag("0")}>全部</Button>
            <Button onClick={() => handleTag("1")}>知识分享</Button>
            <Button onClick={() => handleTag("2")}>感悟</Button>
            <Button onClick={() => handleTag("3")}>其它</Button>
            {user && <Button onClick={() => handleTag("99")}>草稿</Button>}
          </Box>
          <TextField
            placeholder="高级搜索"
            id="standard-bare"
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    onClick={() => searchData}
                    color="disabled"
                    cursor="pointer"
                  />
                </InputAdornment>
              )
            }}
          />
        </Box>
        {postData.length ? (
          postData.map(item => (
            <Grid item xs={12} key={item.id}>
              <div className="markdown-body article ar-item">
                <div className="flex-box title">
                  <div>
                    <Moment format="YYYY-MM-DD">{item.createTime}</Moment>
                    <span className="tag">{item.tagName}</span>
                  </div>
                  <div>
                    {user && (
                      <Button
                        size="small"
                        href={"/admin/editor?entry=article&postId=" + item.id}
                      >
                        编辑
                      </Button>
                    )}

                    <Button size="small" href={"/post?id=" + item.id}>
                      查看详情
                    </Button>
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
              </div>
            </Grid>
          ))
        ) : (
          <Empty />
        )}
      </Grid>

      {// 暂不公开
      false && (
        <Box display="flex" marginBottom="60px" justifyContent="center" p={1}>
          <Button
            variant="contained"
            startIcon={<KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>}
            style={{ marginRight: "15px" }}
          ></Button>
          <Button
            variant="contained"
            endIcon={<KeyboardArrowRightIcon></KeyboardArrowRightIcon>}
          ></Button>
        </Box>
      )}
    </Main>
  );
}

Home.getInitialProps = async ({ query }) => {
  const res = await fetch("post");
  return { lists: res.data };
};
