exports.ids = [13];
exports.modules = {

/***/ "D5qJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("UXZV");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0bYB");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Lc87");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_2__);



const defaultOptions = {
  basiclUrl: "http://api.boxser.cn/api/",
  method: "get",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  },
  timeout: 6000
}; // ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PATCH', 'PUT']

const nextFetch = options => {
  let [opts, method, requestUrl] = [null, "get", null];
  opts = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultOptions, options || {});
  method = opts.method.toLowerCase();
  requestUrl = opts.basiclUrl;
  requestUrl += opts.url;

  if (typeof options === "string") {
    requestUrl = defaultOptions["basiclUrl"] + options;
  }

  if (method !== "get") {
    opts.body = query_string__WEBPACK_IMPORTED_MODULE_2___default.a.stringify(opts.query);
  }

  return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default()(requestUrl, opts).then(r => r.json()).then(result => {
    return result;
  });
};

/* harmony default export */ __webpack_exports__["a"] = (nextFetch);

/***/ }),

/***/ "Lzxq":
/***/ (function(module, exports) {



/***/ }),

/***/ "UXZV":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("dGr4");

/***/ }),

/***/ "XwW9":
/***/ (function(module, exports) {



/***/ }),

/***/ "l0rF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BfEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KKbo");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("s+MZ");
/* harmony import */ var _material_ui_icons_Navigation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Navigation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("D5qJ");
/* harmony import */ var braft_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("bdNl");
/* harmony import */ var braft_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(braft_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("vmXh");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var braft_editor_dist_index_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("Lzxq");
/* harmony import */ var braft_editor_dist_index_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(braft_editor_dist_index_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _public_css_editor_less__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("XwW9");
/* harmony import */ var _public_css_editor_less__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_public_css_editor_less__WEBPACK_IMPORTED_MODULE_8__);
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
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: open,
    1: setOpen
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: taglist,
    1: setTag
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: tagIndex,
    1: setIndex
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(1);
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
      let result = await Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])({
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
    Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])({
      url: "post",
      method: "POST",
      query: params
    }).then(result => {
      alert("发布成功！");
    });
  };

  async function fetchTag() {
    const res = await Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])("tag");

    if (res.code === 200) {
      setTag(res.data);
    }

    if (postId && Number(postId) > 0) {
      let lastArticle = await Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(`post/${postId}`);
      lastArticle = lastArticle.data[0];
      setTitle(lastArticle["title"]);
      setEditor(braft_editor__WEBPACK_IMPORTED_MODULE_5___default.a.createEditorState(lastArticle["content"]));
      setChecked(lastArticle["isPublic"]);
      setIndex(lastArticle["tagid"]);
    }
  }

  async function fetchUser() {
    const res = await Object(_public_js_nextFetch__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(`user_CV?userId=${user.id}`);

    if (res.code === 200) {
      setEditor(braft_editor__WEBPACK_IMPORTED_MODULE_5___default.a.createEditorState(res.data[0]["content"]));
    }
  }

  return __jsx("div", {
    className: "editor"
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
    component: "div",
    style: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#21242a"
    }
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
      onChange: e => setTitle(e.target.value)
    }) : null
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
    onClick: submitContent
  }, __jsx(_material_ui_icons_Navigation__WEBPACK_IMPORTED_MODULE_3___default.a, null), "\u53D1\u5E03")), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
    open: open,
    className: "editor-modal",
    onClose: () => setOpen(false)
  }, __jsx("div", {
    className: "blank-body"
  }, __jsx("h2", {
    id: "simple-modal-title"
  }, "\u53D1\u5E03\u6587\u7AE0"), __jsx("div", {
    id: "simple-modal-description"
  }, __jsx("h4", null, "\u6807\u7B7E\u9009\u62E9"), taglist && taglist.map(tag => {
    return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      size: "small",
      variant: tagIndex === tag.id ? "contained" : "outlined",
      color: "primary",
      component: "span",
      onClick: () => {
        setIndex(index);
      }
    }, tag.tagname);
  }), __jsx("div", {
    className: "draft"
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["FormControlLabel"], {
    control: __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Checkbox"], {
      color: "primary",
      checked: checked,
      onChange: () => {
        setChecked(!checked);
      },
      value: "0"
    }),
    label: "\u4FDD\u5B58\u4E3A\u8349\u7A3F"
  }))), __jsx("div", {
    className: "footer"
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "outlined",
    color: "primary",
    onClick: () => setOpen(false)
  }, "\u53D6\u6D88"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "contained",
    onClick: submitArticle,
    color: "primary"
  }, "\u786E\u8BA4\u5E76\u4FDD\u5B58")))));
}

/***/ })

};;