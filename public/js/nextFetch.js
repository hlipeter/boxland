import fetch from "isomorphic-unfetch";
import qs from "query-string";

const defaultOptions = {
  basiclUrl: "http://api.boxser.cn/api/",
  method: "get",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  },
  timeout: 6000
};

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

  if (method !== "get") {
    opts.body = qs.stringify(opts.query);
  }

  return fetch(requestUrl, opts)
    .then(r => r.json())
    .then(result => {
      return result;
    });
};

export default nextFetch;
