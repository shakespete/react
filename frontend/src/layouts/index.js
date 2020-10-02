import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useKeycloak } from '@react-keycloak/web';
import { Link, useHistory } from 'react-router-dom';
import logo from '../images/invertigro-logo.png';
import {
  AreaChartOutlined,
  HddOutlined,
  ReconciliationOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const Logo = styled.img`
  height: 45px;
  width: 50px;
  margin-top: 5px;
`;

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AppLayout = ({ children }) => {
  let history = useHistory();
  const { keycloak } = useKeycloak();
  const [collapsed, setCollapsed] = useState(false);

  const collapseHandler = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('realm');
    history.push('/login');
    keycloak.logout();
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo src={logo} alt="Logo" />
          {keycloak?.authenticated ? (
            <div style={{ verticalAlign: 'middle', fontSize: '20px' }}>
              <LogoutOutlined onClick={logoutHandler} />
            </div>
          ) : (
            <></>
          )}
        </Header>
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={collapseHandler}>
            <Menu
              defaultOpenKeys={['sub1']}
              defaultSelectedKeys={['1']}
              mode="inline"
            >
              <SubMenu
                key="sub1"
                icon={<AreaChartOutlined />}
                title="Dashboards"
              >
                <Menu.Item key="1">
                  <Link to="/home">Home</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Admin">
                <Menu.Item key="4">
                  <Link to="/management/sites">Sites</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/management/tenants">Tenants</Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/management/users">Users</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<HddOutlined />}
                title="Assets and Locations"
              >
                <Menu.Item key="7">
                  <Link to="/assets">Manage Assets</Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="/locations">Manage Locations</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                icon={<ReconciliationOutlined />}
                title="Inventory"
              >
                <Menu.Item key="9">
                  <Link to="/brands">Manage Brands</Link>
                </Menu.Item>
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
