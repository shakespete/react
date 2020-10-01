import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const collapseHandler = (collapsed) => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header className="header">
          <div className="logo">LOGO</div>
        </Header>
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={collapseHandler}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <SubMenu
                key="sub1"
                icon={<PieChartOutlined />}
                title="Dashboards"
              >
                <Menu.Item key="1">Home</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Admin">
                <Menu.Item key="4">Sites</Menu.Item>
                <Menu.Item key="5">Users</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<FileOutlined />}
                title="Assets and Locations"
              >
                <Menu.Item key="6">Manage Assets</Menu.Item>
                <Menu.Item key="7">Manage Locations</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center', paddingTop: '0px' }}>
          Invertigro ©2020
        </Footer>
      </Layout>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
