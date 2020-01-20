exports.ids = [0];
exports.modules = {

/***/ "./components/bf-editor.js":
/*!*********************************!*\
  !*** ./components/bf-editor.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BfEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/Navigation */ "@material-ui/icons/Navigation");
/* harmony import */ var _material_ui_icons_Navigation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Navigation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../public/js/nextFetch */ "./public/js/nextFetch.js");
/* harmony import */ var braft_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! braft-editor */ "braft-editor");
/* harmony import */ var braft_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(braft_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! js-cookie */ "js-cookie");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var braft_editor_dist_index_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! braft-editor/dist/index.css */ "./node_modules/braft-editor/dist/index.css");
/* harmony import */ var braft_editor_dist_index_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(braft_editor_dist_index_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _public_css_editor_less__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../public/css/editor.less */ "./public/css/editor.less");
/* harmony import */ var _public_css_editor_less__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_public_css_editor_less__WEBPACK_IMPORTED_MODULE_8__);
var _jsxFileName = "/Users/admin/Desktop/boxland/components/bf-editor.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









function BfEditor(props) {
  const {
    entry,
    postId
  } = props;
  const user = JSON.parse(js_cookie__WEBPACK_IMPORTED_MODULE_6___default.a.get("userlogin") || null);
  const {
    0: title,
    1: setTitle
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: open,
    1: setOpen
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: taglist,
    1: setTag
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: tagObj,
    1: settagObj
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [checked, setChecked] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false);
  const {
    0: editorState,
    1: setEditor
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(braft_editor__WEBPACK_IMPORTED_MODULE_5___default.a.createEditorState(null));
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!user) {
      next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push({
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
      let result = await Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__["default"])({
        url: "user/resume",
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
      tagname: tagObj["tagname"],
      tagid: tagObj["id"],
      isPublic: checked ? "0" : "1",
      uid: user.id,
      content: editorState
    };

    if (postId) {
      // 修改文章
      params.id = postId;
      let result = await Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__["default"])({
        url: `post/${postId}`,
        method: "put",
        query: params
      });
      console.log("this-result", result);

      if (result.code != 200) {
        return alert(result["message"]);
      }

      setOpen(false);
      alert("更新成功！");
      next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push({
        pathname: "/admin/index"
      });
    } else {
      // 写文章
      let result = await Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__["default"])({
        url: "post",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        query: params
      });

      if (result.code != 200) {
        return alert(result["message"]);
      }

      setOpen(false);
      alert("发布成功！");
      next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push({
        pathname: "/admin/index"
      });
    }
  };

  async function fetchTag() {
    const res = await Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__["default"])("tag");

    if (res.code === 200) {
      setTag(res.data);
      settagObj(res.data[0]);
    }

    if (postId && Number(postId) > 0) {
      let lastArticle = await Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__["default"])(`post/${postId}`);
      lastArticle = lastArticle.data[0];
      setTitle(lastArticle["title"]);
      setEditor(braft_editor__WEBPACK_IMPORTED_MODULE_5___default.a.createEditorState(lastArticle["content"]));
      setChecked(lastArticle["isPublic"]);
      let flag = res.data.filter(item => {
        return item.id === lastArticle["tagid"];
      });
      settagObj(flag[0]);
    }
  }

  async function fetchUser() {
    const res = await Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__["default"])(`user/resume?userId=${user.id}`);

    if (res.code === 200) {
      setEditor(braft_editor__WEBPACK_IMPORTED_MODULE_5___default.a.createEditorState(res.data[0]["content"]));
    }
  }

  return __jsx("div", {
    className: "editor",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143
    },
    __self: this
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
    component: "div",
    style: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#21242a"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144
    },
    __self: this
  }, __jsx(braft_editor__WEBPACK_IMPORTED_MODULE_5___default.a, {
    className: "editor-main",
    value: editorState,
    onChange: e => setEditor(e.toHTML()),
    onSave: submitContent,
    placeholder: "\u8F93\u5165\u6B63\u6587...",
    componentBelowControlBar: entry === "article" ? __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], {
      fullWidth: true,
      autoComplete: "off",
      size: "medium",
      id: "standard-basic",
      label: "\u8F93\u5165\u6807\u9898...",
      className: "bf-title",
      value: title,
      onChange: e => setTitle(e.target.value),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 163
      },
      __self: this
    }) : null,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155
    },
    __self: this
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Fab"], {
    variant: "extended",
    size: "medium",
    color: "primary",
    "aria-label": "add",
    style: {
      position: "fixed",
      right: "15px",
      bottom: "60px",
      width: "100px"
    },
    onClick: submitContent,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177
    },
    __self: this
  }, __jsx(_material_ui_icons_Navigation__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190
    },
    __self: this
  }), "\u53D1\u5E03")), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    open: open,
    className: "editor-modal",
    onClose: () => setOpen(false),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195
    },
    __self: this
  }, __jsx("div", {
    className: "blank-body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 200
    },
    __self: this
  }, __jsx("h2", {
    id: "simple-modal-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 201
    },
    __self: this
  }, "\u53D1\u5E03\u6587\u7AE0"), __jsx("div", {
    id: "simple-modal-description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 202
    },
    __self: this
  }, __jsx("h4", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 203
    },
    __self: this
  }, "\u6807\u7B7E\u9009\u62E9"), taglist && taglist.map(tag => {
    return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      size: "small",
      variant: tagObj.id === tag.id ? "contained" : "outlined",
      color: "primary",
      component: "span",
      onClick: () => {
        settagObj(tag);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 207
      },
      __self: this
    }, tag.tagname);
  }), __jsx("div", {
    className: "draft",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221
    },
    __self: this
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["FormControlLabel"], {
    control: __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Checkbox"], {
      color: "primary",
      checked: checked,
      onChange: () => {
        setChecked(!checked);
      },
      value: "0",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 224
      },
      __self: this
    }),
    label: "\u4FDD\u5B58\u4E3A\u8349\u7A3F",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 222
    },
    __self: this
  }))), __jsx("div", {
    className: "footer",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237
    },
    __self: this
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outlined",
    color: "primary",
    onClick: () => setOpen(false),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238
    },
    __self: this
  }, "\u53D6\u6D88"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "contained",
    onClick: submitArticle,
    color: "primary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 245
    },
    __self: this
  }, "\u786E\u8BA4\u5E76\u4FDD\u5B58")))));
}

/***/ }),

/***/ "./node_modules/braft-editor/dist/index.css":
/*!**************************************************!*\
  !*** ./node_modules/braft-editor/dist/index.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./public/css/editor.less":
/*!********************************!*\
  !*** ./public/css/editor.less ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./public/js/nextFetch.js":
/*!********************************!*\
  !*** ./public/js/nextFetch.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! isomorphic-unfetch */ "isomorphic-unfetch");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! query-string */ "query-string");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_2__);



const defaultOptions = {
  basiclUrl: "http://api.boxser.cn/",
  method: "get",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json"
  },
  timeout: 6000
};

if (true) {
  defaultOptions["basiclUrl"] = "http://127.0.0.1:8080/";
} // ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PATCH', 'PUT']


const nextFetch = options => {
  let [opts, method, requestUrl] = [null, "get", null];
  opts = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultOptions, options || {});
  method = opts.method.toLowerCase();
  requestUrl = opts.basiclUrl;
  requestUrl += opts.url;

  if (typeof options === "string") {
    requestUrl = defaultOptions["basiclUrl"] + options;
  }

  if (method !== "get" && method !== "put") {
    opts.body = query_string__WEBPACK_IMPORTED_MODULE_2___default.a.stringify(opts.query);
  }

  return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default()(requestUrl, opts).then(r => r.json()).then(result => {
    return result;
  });
};

/* harmony default export */ __webpack_exports__["default"] = (nextFetch);

/***/ })

};;
//# sourceMappingURL=0.js.map