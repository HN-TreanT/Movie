import React from "react";
import {HomeOutlined} from "@ant-design/icons"
import "./TopBar.scss";
const TopBar: React.FC = () => {
  return <div id="top_bar">
    <HomeOutlined size={40}/>
  </div>;
};
export default TopBar;
