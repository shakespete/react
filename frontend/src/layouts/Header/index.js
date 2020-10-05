import React from 'react';
import styled from 'styled-components';
import logo from 'images/invertigro-logo.png';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { useKeycloak } from '@react-keycloak/web';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Logo = styled.img`
  height: 45px;
  width: 50px;
  margin-top: 5px;
`;

const HeaderComponent = () => {
  let history = useHistory();
  const { keycloak } = useKeycloak();
  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('realm');
    history.push('/login');
    keycloak.logout();
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Logo src={logo} alt="Logo" />
      {keycloak.authenticated ? (
        <div
          style={{
            verticalAlign: 'middle',
            fontSize: '20px',
            color: '#55b72e',
          }}
        >
          <LogoutOutlined onClick={logoutHandler} />
        </div>
      ) : (
        <></>
      )}
    </Header>
  );
};

export default HeaderComponent;
