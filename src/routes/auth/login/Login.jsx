import React from 'react';
import { Button, Checkbox, Form, Input, Divider, message } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TelegramLoginButton from 'telegram-login-button';
import { toast } from 'react-toastify';
import { ERROR, LOADING, LOGIN } from '../../../redux/actions/actions';

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { loading } = useSelector(state => state);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
        dispatch({ type: LOADING, loading: true });
      const response = await axios.post("/auth/login", values);
      const data = response.data;  
      console.log(data);
      const { token, user } = data.payload;
      dispatch({ type: LOGIN, payload: { token, user } });
      if(data?.payload?.token) {
        toast("Login successful!", { type: "success" });
        navigate("/dashboard");
      }
      
      messageApi.open({
        type: 'success',
        content: 'Login successful!',
      });
      
      form.resetFields();
    } catch (error) {
      console.error('Login failed:', error);
      dispatch({ type: ERROR, error: error.message });
      messageApi.open({
        type: 'error',
        content: 'Login failed. Please try again.',
      });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decode = credentialResponse.credential.split('.')[1];
      const userData = JSON.parse(atob(decode));
      const user = {
        username: userData.email,
        password: userData.sub,
        first_name: userData.given_name
      };
      
      const response = await axios.post("/auth/login", user);
      const data = response.data;
      console.log(data);
      
      const { token, user: userInfo } = data.payload;
      
      dispatch({ type: LOGIN, payload: { token, user: userInfo } });
      
      messageApi.open({
        type: 'success',
        content: 'Login successful!',
      });
      
      navigate("/dashboard"); 
    } catch (error) {
      console.error('Google login failed:', error);
      dispatch({ type: ERROR, error: error.message });
      messageApi.open({
        type: 'error',
        content: 'Google login failed. Please try again.',
      });
    }
  };

  const handleTelegramSuccess = async (user) => {
    try {
      const first_name = (user.first_name.slice(0, user.first_name.indexOf(" ")));
      const userData = {
        username: "@" + user.username,
        password: user.id.toString(),
        first_name: first_name
      };
      
      const response = await axios.post("/auth/login", userData);
      const data = response.data;
      console.log(data);
      
      const { token, user: userInfo } = data.payload;
      
      dispatch({ type: LOGIN, payload: { token, user: userInfo } });
      
      messageApi.open({
        type: 'success',
        content: 'Login successful!',
      });
      
      navigate("/dashboard"); 
    } catch (error) {
      console.error('Telegram login failed:', error);
      dispatch({ type: ERROR, error: error.message });
      messageApi.open({
        type: 'error',
        content: 'Telegram login failed. Please try again.',
      });
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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <h1 className='text-center text-[38px] font-semibold text-[dodgerblue]'>Login</h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button className='w-full' type="primary" htmlType="submit" disabled={loading}>
            Login
          </Button>
        </Form.Item>
        <p className='text-center text-[14px]'>
          Don't have an account? <a className='text-[dodgerblue] underline' href="/auth/register">Register</a>
        </p>
        <Divider><span className='text-[14px] text-[gray]'>or</span></Divider>
        <div className='w-full flex-col items-center flex justify-center'>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('Google Login Failed');
            }}
            useOneTap
          />
          <br />
          <TelegramLoginButton
            botName="BigProject60_bot"
            dataOnauth={handleTelegramSuccess}
          />
        </div>
      </Form>
    </div>
  )
};

export default Login;
