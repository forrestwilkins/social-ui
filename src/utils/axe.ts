import React from "react";
import { Environments } from "../constants/common";

export const initAxe = () => {
  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV !== Environments.Production
  ) {
    const ReactDOM = require("react-dom");
    const axe = require("@axe-core/react");
    axe(React, ReactDOM, 1000);
  }
};
