import React, { useState, useEffect } from "react";
import Router from "next/router";
import {
  Typography,
  TextField,
  Fab,
  Button,
  FormControlLabel,
  Checkbox,
  Modal
} from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import fetch from "../public/js/nextFetch";
import BraftEditor from "braft-editor";
import jsCookie from "js-cookie";
import "braft-editor/dist/index.css";
import "../public/css/editor.less";

export default function BfEditor(props) {
  const { entry, postId } = props;
  const user = JSON.parse(jsCookie.get("userlogin") || null);
  const [title, setTitle] = useState(null);
  const [open, setOpen] = useState(false);
  const [taglist, setTag] = useState(null);
  const [tagIndex, setIndex] = useState(1);
  const [checked, setChecked] = React.useState(false);
  const [editorState, setEditor] = useState(
    BraftEditor.createEditorState(null)
  );

  useEffect(() => {
    if (!user) {
      Router.push({
        pathname: "/admin/login"
      });
      return;
    }
    if (entry === "userinfo") {
      fetchUser();
    } else {
      fetchTag();
    }
  }, []);

  const submitContent = async () => {
    if (user && entry === "userinfo") {
      let result = await fetch({
        url: "user_CV",
        method: "PUT",
        query: {
          userId: user.id,
          content: editorState
        }
      });
      if (result.code == 200) {
        alert("发布成功！");
      }
    } else {
      setOpen(true);
    }
  };

  const submitArticle = async () => {
    if (!title || !editorState) {
      alert("标题或内容不能为空！");
      return;
    }
    let params = {
      title,
      tagname: taglist[tagIndex]["tagname"],
      tagid: taglist[tagIndex]["id"],
      isPublic: checked ? "0" : "1",
      uid: user.id,
      content: editorState
    };
    console.log(params);
    fetch({
      url: "post",
      method: "POST",
      query: params
    }).then(result => {
      alert("发布成功！");
    });
  };

  async function fetchTag() {
    const res = await fetch("tag");
    if (res.code === 200) {
      setTag(res.data);
    }
    if (postId && Number(postId) > 0) {
      let lastArticle = await fetch(`post/${postId}`);
      lastArticle = lastArticle.data[0];
      setTitle(lastArticle["title"]);
      setEditor(BraftEditor.createEditorState(lastArticle["content"]));
      setChecked(lastArticle["isPublic"]);
      setIndex(lastArticle["tagid"]);
    }
  }
  async function fetchUser() {
    const res = await fetch(`user_CV?userId=${user.id}`);
    if (res.code === 200) {
      setEditor(BraftEditor.createEditorState(res.data[0]["content"]));
    }
  }

  return (
    <div className="editor">
      <Typography
        component="div"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#21242a"
        }}
      >
        <BraftEditor
          className="editor-main"
          value={editorState}
          onChange={e => setEditor(e.toHTML())}
          onSave={submitContent}
          placeholder="输入正文..."
          componentBelowControlBar={
            entry === "article" ? (
              <TextField
                fullWidth
                autoComplete="off"
                size="medium"
                id="standard-basic"
                label="输入标题..."
                className="bf-title"
                onChange={e => setTitle(e.target.value)}
              />
            ) : null
          }
        />

        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          style={{
            position: "fixed",
            right: "15px",
            bottom: "60px",
            width: "100px"
          }}
          onClick={submitContent}
        >
          <NavigationIcon />
          发布
        </Fab>
      </Typography>

      <Modal
        open={open}
        className="editor-modal"
        onClose={() => setOpen(false)}
      >
        <div className="blank-body">
          <h2 id="simple-modal-title">发布文章</h2>
          <div id="simple-modal-description">
            <h4>标签选择</h4>
            {taglist &&
              taglist.map(tag => {
                return (
                  <Button
                    size="small"
                    variant={tagIndex === tag.id ? "contained" : "outlined"}
                    color="primary"
                    component="span"
                    onClick={() => {
                      setIndex(index);
                    }}
                  >
                    {tag.tagname}
                  </Button>
                );
              })}

            <div className="draft">
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={checked}
                    onChange={() => {
                      setChecked(!checked);
                    }}
                    value="0"
                  />
                }
                label="保存为草稿"
              />
            </div>
          </div>
          <div className="footer">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(false)}
            >
              取消
            </Button>
            <Button variant="contained" onClick={submitArticle} color="primary">
              确认并保存
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
