import fetch from "isomorphic-unfetch";
import qs from "query-string";

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

if (process.env.NODE_ENV === "development") {
  defaultOptions["basiclUrl"] = "http://127.0.0.1:8080/";
}

// ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PATCH', 'PUT']

const nextFetch = options => {
  let [opts, method, requestUrl] = [null, "get", null];
  opts = Object.assign({}, defaultOptions, options || {});
  method = opts.method.toLowerCase();
  requestUrl = opts.basiclUrl;
  requestUrl += opts.url;

  if (typeof options === "string") {
    requestUrl = defaultOptions["basiclUrl"] + options;
  }
  if (method !== "get" && method !== "put") {
    opts.body = qs.stringify(opts.query);
  }

  return fetch(requestUrl, opts)
    .then(r => r.json())
    .then(result => {
      return result;
    });
};

export default nextFetch;
