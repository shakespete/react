import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import styled from 'styled-components';

import HeaderComponent from './Header';
import NavMenu from './NavMenu';
import BreadCrumbComponent from './BreadCrumb';

const { Content, Footer } = Layout;

const ContentContainer = styled.div`
  padding: 24px;
  minheight: 360px;
`;

const AppLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <NavMenu />
        <Content style={{ margin: '0 16px' }}>
          <BreadCrumbComponent />
          <ContentContainer>{children}</ContentContainer>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center', paddingTop: '0px' }}>
        Invertigro ©2020
      </Footer>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
