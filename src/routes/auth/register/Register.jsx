import React from 'react';
import { Button, Checkbox, Form, Input, Divider, message } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TelegramLoginButton from 'telegram-login-button'
import { ERROR, REGISTER } from '../../../redux/actions/actions';
import { toast } from 'react-toastify';


const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state);

  const handleRegisterSuccess = (data) => {
    const { token, user } = data.payload;
    dispatch({ type: REGISTER, payload: { token, user } });
    if(data?.payload?.token) {
      toast("Login successful!", { type: "success" });
      navigate("/dashboard");
    }
    messageApi.open({
      type: 'success',
      content: 'Registration successful!',
    });
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post("/auth", values);
      handleRegisterSuccess(data);
    } catch (error) {
      console.error('Error:', error);
      dispatch({ type: ERROR, error: error });
      messageApi.open({
        type: 'error',
        content: 'Registration failed. Please try again.',
      });
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleGoogleRegister = async (credentialResponse) => {
    try {
      const decode = credentialResponse.credential.split('.')[1];
      const userData = JSON.parse(atob(decode));
      const user = {
        username: userData.email,
        password: userData.sub,
        first_name: userData.given_name
      };
      const { data } = await axios.post("/auth", user);
      handleRegisterSuccess(data);
    } catch (error) {
      console.error('Register Failed:', error);
      messageApi.open({
        type: 'error',
        content: 'Google Registration failed. Please try again.',
      });
    }
  };

  const handleTelegramRegister = async (user) => {
    try {
      const first_name = user.first_name.split(' ')[0];
      const userData = {
        username: "@" + user.username,
        password: user.id.toString(),
        first_name: first_name
      };
      const { data } = await axios.post("/auth", userData);
      handleRegisterSuccess(data);
    } catch (error) {
      console.error('Register Failed:', error);
      messageApi.open({
        type: 'error',
        content: 'Telegram Registration failed. Please try again.',
      });
    }
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
          <Button className='w-full' type="primary" htmlType="submit" disabled={loading}>
            Register
          </Button>
        </Form.Item>
        <p>Already have an account? <a className='text-[dodgerblue] underline' href="/auth">Login</a></p>
        <Divider><span className='text-[14px] text-[gray]'>or</span></Divider>
        <div className='w-full flex  flex-col items-center justify-center'>
          <GoogleLogin
            onSuccess={handleGoogleRegister}
            onError={() => {
              console.log('Register Failed');
              messageApi.open({
                type: 'error',
                content: 'Google Registration failed. Please try again.',
              });
            }}
            useOneTap
          />
          <br />
          <TelegramLoginButton
            botName="BigProject60_bot"
            dataOnauth={handleTelegramRegister}
          />,
        </div>
      </Form>
    </div>
  )
}

export default Register;
