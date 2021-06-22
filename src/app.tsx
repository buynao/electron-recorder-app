import * as React from "react";
import * as ReactDOM from "react-dom";
import "regenerator-runtime/runtime";
import { positions } from "react-alert";

import App from "./page/index";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
