import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Divider, message } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../../../api';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      setLoading(true);
      const response = await axios.post("/auth/login", values);
      console.log(response);
      dispatch({ type: "LOGIN_USER", data: response.data });
      messageApi.open({
        type: 'success',
        content: 'Login successful!',
      });
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: 'Login failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
    form.resetFields();
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
        <h1 className='text-center text-[38px] font-semibold text-[dodgerblue]'>Login</h1>
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
          <Button className='w-full' type="primary" htmlType="submit" loading={loading} disabled={loading}>
            Login
          </Button>
        </Form.Item>
        <p className='text-center text-[14px]'>Don't have an account? <a className='text-[dodgerblue] underline' href="/auth/register">Register</a></p>
        <Divider><span className='text-[14px] text-[gray]'>or</span></Divider>
        <div className='w-full flex justify-center'>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        </div>
      </Form>
    </div>
  )
}

export default Login;
