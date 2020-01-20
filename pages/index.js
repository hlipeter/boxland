import React, { useState, useEffect } from "react";
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

import fetchTemp from "isomorphic-unfetch";

export default function Home(props) {
  const [postData, setPostData] = useState(props.lists);
  const [selected, setSelect] = useState(1);
  const user = JSON.parse(jsCookie.get("userlogin") || null);
  const [tagList, setTags] = useState(props.tagList);
  const [keyword, setkeyword] = useState(null);

  useEffect(() => {
    if (user === null) {
      setTags(tagList.filter(item => item.id !== 99));
    }
  }, []);

  const handleTag = async str => {
    setSelect(str);
    const res = await fetch(`post?type=${str}`);
    setPostData(res.data);
  };
  const searchData = async () => {
    const res = await fetch(`post?keyword=${keyword}`);
    setPostData(res.data);
  };

  const uploadFile = async files => {
    // if (files[0].length === 0) return;
    let file = files[0];
    let body = new FormData();
    body.append("imageFile", file);

    let result = await fetchTemp("http://127.0.0.1:8011/upload/img", {
      method: "put",
      body
    });

    console.log("this-result", result);
  };

  return (
    <Main>
      <div className="upload" style={{ padding: "40px", background: "#ddd" }}>
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            uploadFile(e.target.files);
          }}
        />
      </div>

      <Grid container spacing={1}>
        <div className="nav-warp">
          <Box m={1}>
            {tagList &&
              tagList.map(item => {
                return (
                  <Button
                    variant={item.id === selected ? "contained" : null}
                    onClick={() => handleTag(item.id)}
                    key={item.id}
                  >
                    {item.tagname}
                  </Button>
                );
              })}
          </Box>
          <TextField
            placeholder="高级搜索"
            id="standard-bare"
            margin="normal"
            value={keyword}
            onChange={e => setkeyword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    onClick={searchData}
                    color="disabled"
                    cursor="pointer"
                  />
                </InputAdornment>
              )
            }}
          />
        </div>
        {postData && postData.length ? (
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

      <style jsx>{`
        .nav-warp {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          align-items: baseline;
        }
      `}</style>
    </Main>
  );
}

Home.getInitialProps = async ({ query }) => {
  const res = await fetch("post");
  const tag = await fetch("tag");
  return { lists: res.data, tagList: tag.data };
};
