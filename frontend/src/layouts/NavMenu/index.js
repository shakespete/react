import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import routeList, { subMenuList } from 'routes/list';

const { Sider } = Layout;
const { SubMenu } = Menu;

const getSelectedMenu = history => {
  const urlPath = history.location.pathname;
  const selMenu = routeList.find(route => route.path === urlPath);
  return [selMenu.key, selMenu.parent];
};

const NavMenu = () => {
  let history = useHistory();
  const [selected, menuParent] = getSelectedMenu(history);
  const [openedMenu, setOpenedMenu] = useState([menuParent]);
  const [selectedMenu, setSelectedMenu] = useState([selected]);
  const [collapsed, setCollapsed] = useState(false);

  const openMenuHandler = openKeys => {
    setOpenedMenu(openKeys);
  };

  const selectMenuHandler = ({ item, key, keyPath, selectedKeys }) => {
    // console.log(key);
    setSelectedMenu(key);
  };

  const collapseHandler = () => {
    setCollapsed(prevCollapsed => !prevCollapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={collapseHandler}>
      <Menu
        mode="inline"
        openKeys={openedMenu}
        selectedKeys={selectedMenu}
        onOpenChange={openMenuHandler}
        onSelect={selectMenuHandler}
      >
        {subMenuList.map(submenu => (
          <SubMenu key={submenu.key} icon={submenu.icon} title={submenu.title}>
            {routeList.map(menu => {
              if (menu.parent === submenu.key) {
                return (
                  <Menu.Item key={menu.key}>
                    <Link to={menu.path}>{menu.name}</Link>
                  </Menu.Item>
                );
              }
              return null;
            })}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
};

export default NavMenu;
