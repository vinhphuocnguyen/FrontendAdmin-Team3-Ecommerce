import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuOutlined, UserOutlined, UserAddOutlined, PoweroffOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Content from "./Content";

function SideMenu() {
  const navi = useNavigate();
  const items = [
    { label: "Danh sách sản phẩm", key: "/", icon: <MenuOutlined /> },
    { label: "Danh mục sản phẩm", key: "/categories", icon: <MenuOutlined /> },
    { label: "Nhà cung cấp", key: "/suppliers", icon: <MenuOutlined /> },
    {
      label: "Danh sách nhân viên",
      key: "/employee",
      icon: <UserOutlined />,
    },
    { label: "Danh sách khách hàng", key: "/customers", icon: <UserAddOutlined /> },
    { label: "Đơn hàng", key: "/orders", icon: <FileDoneOutlined /> },
    {
      label: "Signout",
      key: "signout",
      icon: <PoweroffOutlined />,
      danger: true,
    },
  ];
  return (
    <div className="flex">
      <Menu
        className="w-1/6"
        onClick={(key) => {
          if (key.key === "signout") {
            //sign out funtionc here
          } else navi(key.key);
        }}
        items={items}
      />
      <Content />
    </div>
  );
}

export default SideMenu;
