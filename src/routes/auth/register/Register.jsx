import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Divider, message } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TelegramLoginButton from 'telegram-login-button'


const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const {loading} = useSelector(state => state);
 
  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      const {data} = await axios.post("/auth", values);
      console.log(response);
      dispatch({ type: "REGISTER", token: data.payload.token, user: data.payload.user });
      messageApi.open({
        type: 'success',
        content: 'Registration successful!',
      });
    } catch (error) {
      dispatch({ type: "ERROR", error: error });
      messageApi.open({
        type: 'error',
        content: 'Registration failed. Please try again.',
      });
    
    form.resetFields();
    // navigate("/auth");

    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {contextHolder}
      <Form
        layout='vertical'
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <h1 className='text-center text-[38px] font-semibold text-[dodgerblue]'>Register</h1>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button className='w-full' type="primary" htmlType="submit"  disabled={loading}>
            Register
          </Button>
        </Form.Item>
        <p>Already have an account? <a className='text-[dodgerblue] underline' href="/auth">Login</a></p>
        <Divider><span className='text-[14px] text-[gray]'>or</span></Divider>
        <div className='w-full flex  flex-col items-center justify-center'>
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const decode = credentialResponse.credential.split('.')[1]
              const userData = JSON.parse(atob(decode));
              const user = {
                username: userData.email,
                password: userData.sub,
                first_name: userData.given_name
              }
              const response = await axios.post("/auth", user);

              console.log(response.data);

            }}
            onError={() => {
              console.log('Register Failed');
            }}
            useOneTap
          />
          <br />
          <TelegramLoginButton
          
                botName= "BigProject60_bot"
                dataOnauth={async (user) => {
                  console.log(user);
                  const first_name = (user.first_name.slice(0, user.first_name.indexOf(" ")));
                    const userData = {
                        username: user.username,
                        password: user.id,
                        first_name: first_name
                    }
                    console.log(userData);
                    const response = await axios.post("/auth", userData);
                    console.log(response.data);
                }}
            />,
        </div>
      </Form>
    </div>
  )
}

export default Register;
