import React from 'react';
import 'antd/dist/antd.css';
import styled, { createGlobalStyle } from 'styled-components';
import { Form, Input, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const GlobalStyle = createGlobalStyle`
  body {
    background: #f9f9f9;
  }
`;

const StyledForm = styled(Form)`
  background: #ffffff;
  width: 300px;
  padding: 20px !important;
  border: 1px solid #dadcdf;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  text-align: center;

  .login-form-button {
    width: 100%;
  }
`;

const RealmLogin = () => {
  localStorage.removeItem('realm');

  const onFinish = values => {
    localStorage.setItem('realm', values.realm);
    window.location.assign('/');
  };

  return (
    <StyledForm
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <GlobalStyle />
      <img src="../../images/invertigro.jpg" alt="InvertiGro" width="120" />
      <h4>Welcome</h4>
      <p>
        Log in to <b>InvertiGro</b> to continue
      </p>
      <Form.Item
        name="realm"
        rules={[
          {
            required: true,
            message: 'Please enter your realm name!',
          },
        ]}
      >
        <Input
          prefix={<HomeOutlined className="site-form-item-icon" />}
          placeholder="Realm name"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Continue
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default RealmLogin;
