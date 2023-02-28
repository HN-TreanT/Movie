import React from "react";
import { Menu, Avatar, Image } from "antd";
import { Link } from "react-router-dom";
import { RouterLinks } from "../../const";
import {
  
  UserOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/es/menu/MenuItem";
import "./SideBar.scss";
import logo from "../../assets/logo.svg";
// interface MenuItem {
//   label: String;
//   key: React.Key;
//   icon?: React.ReactNode;
//   children?: MenuItem[];
//   type?: "group";
// }
// const items: MenuItem[] = [
//   {
//     label: "avigation One",
//     key: "1",
//     icon: <AppstoreOutlined />,
//   },
//   {
//     label: "Mail",
//     key: "2",
//     icon: <CameraOutlined />,
//   },
// ];
const SideBar: React.FC = () => {
  return (
    <div className="side_bar">
      <Image src={logo} width={90} height={90} preview={false} />

      <div className="user_info">
        <div>
          <Avatar size={"large"} icon={<UserOutlined />} />
        </div>
        <div className="name">Hoang Nam</div>
      </div>
      <div className="side_bar_menu">
        <Menu style={{ fontSize: "1.4em" }} mode="vertical" theme="light">
          <MenuItem
            title="Movie"
            key={1}
            icon={<CameraOutlined style={{ fontSize: "1.3rem" }} />}
          >
            Movie
            <Link to={RouterLinks.MOVIE_PAGE}></Link>
          </MenuItem>
          <MenuItem
            title="user"
            key={2}
            icon={<UserOutlined style={{ fontSize: "1.3rem" }} />}
          >
            User
            <Link to={RouterLinks.USER_PAGE}></Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
export default SideBar;
