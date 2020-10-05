import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import {
  AreaChartOutlined,
  HddOutlined,
  ReconciliationOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const NavMenu = () => {
  let history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  console.log(history); // Fix routing auto-select of menu
  const [openedMenu, setOpenedMenu] = useState(['sub1']);
  const [selectedMenu, setSelectedMenu] = useState(['1']);

  const openMenuHandler = openKeys => {
    setOpenedMenu(openKeys);
  };

  const selectMenuHandler = ({ item, key, keyPath, domEvent }) => {
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
        onClick={selectMenuHandler}
      >
        <SubMenu key="sub1" icon={<AreaChartOutlined />} title="Dashboards">
          <Menu.Item key="1">
            <Link to="/home">Home</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Admin">
          <Menu.Item key="2">
            <Link to="/management/sites">Sites</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/management/tenants">Tenants</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/management/users">Users</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<HddOutlined />} title="Assets and Locations">
          <Menu.Item key="5">
            <Link to="/assets">Manage Assets</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/locations">Manage Locations</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<ReconciliationOutlined />} title="Inventory">
          <Menu.Item key="7">
            <Link to="/brands">Manage Brands</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default NavMenu;
