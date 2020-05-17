// @deno-types="../../types/react/index.d.ts"
import React from "https://dev.jspm.io/react";
import { ReactDOMServer } from "../../deps.ts";
import View, { AppProps } from "./view.tsx";

export default (props: AppProps) =>
  `<!DOCTYPE html>
  <html>
  <head>
  <link rel="stylesheet" id="wc-block-style-css" href="../static/css/styles.css" type="text/css" media="all"/>
  </head>
  <body>
  ${ReactDOMServer.renderToString(<View {...props} />)}
  <body>
  </html>`;
