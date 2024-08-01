import { BiPurchaseTagAlt } from "react-icons/bi"; 
import { FcLike } from "react-icons/fc"; 
import React, { useState } from 'react';
import {Button, Layout, Menu, Spin, Typography, Row, Col, Avatar, theme,  } from 'antd';
const { Header, Content, Sider } = Layout;
import useFetch from '../../hooks/useFetch';
import { NavLink } from 'react-router-dom';
import shopifyLogo from "../dashboard/shopifyLogo.png";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import Loading from "../../utils/Loading";

const items = new Array(5).fill(null).map((_, index) => ({
  key: `sub${index + 1}`,
  label: `nav ${index + 1}`,
}));

const Profile = () => {
  const [data, loading] = useFetch("/auth/profile");
  const [collapsed, setCollapsed] = useState(false);

  console.log(data)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const profilePicture = data?.photo_url || 'https://via.placeholder.com/300';

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <NavLink style={{padding: "20px", display: "flex", gap: "5px", flexDirection: "column", justifyContent: "center", alignItems: "center"}} to={"/"} className="demo-logo-vertical w-full h-[80px] ">
            <img style={{ width: "50px", marginTop: "20px" }} src={shopifyLogo} alt="" />
            <p className='text-[white] text-center '>SHOPIFY</p>
          </NavLink>
          <br />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Profile',
            },
            {
              key: '2',
              icon: <FcLike />,
              label: 'Liked',
            },
            {
              key: '3',
              icon: <BiPurchaseTagAlt />,
              label: 'Purchased',
            },
            
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0px',
          }}
        >
          <Button
            type="text"
            
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: "white"
            }}
          />
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Header>
        <Content
          style={{
            padding: '20px 48px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <br />
          <div
            style={{
              background: colorBgContainer,
              minHeight: 900,
              padding: 50,
              width: '100%',
              borderRadius: borderRadiusLG,
              display: 'flex',
              justifyContent: 'center',
              // alignItems: 'center',
            }}
          >
            <div className="w-[950px] h-[500px] bg-[#1e8fff20] rounded-lg p-5">
              <div className="w-full h-full bg-[#1e8fff35] rounded-lg flex justify-between items-center gap-[20px]">
                <div className="w-1/2 h-full flex items-center justify-center flex-col">
                  {
                    loading ? <Loading /> : <>
                      <Avatar className="w-[300px] h-[300px] " >
                        {
                          data?.photo_url ? <img style={{objectFit: "cover", width: "300px", height: "300px"}} src={data?.photo_url} alt="" /> : data?.first_name.at(0)
                        }
                      </Avatar>
                      <br />
                      <p>Hello, World</p>
                      <p className="text-3xl text-[dodgerblue]">It's me, {data?.first_name}!</p>
                      </>
                    
                  }
                </div>
                <div className="w-1/2 h-full p-5">
                  {
                    loading ? <Loading /> : <>
                    <h1 className="text-3xl text-center mb-5">Profile Information</h1>
                      <p className="text-xl">First Name: <strong>{data?.first_name}</strong></p>
                      <p className="text-xl">Last Name: <strong>{data?.last_name || '--'}</strong></p>
                      <p className="text-xl">Username: <strong>{data?.username}</strong></p>
                      <p className="text-xl">Email: <strong>{data?.email || '--'}</strong> </p>
                    </>
                  }
                </div>
              </div>
            </div>
            {/* {loading ? (
              <Spin tip="Loading profile..." />
            ) : (
              <Row gutter={[16, 16]}>
                <div className=' flex justify-center'>
                    <div className='w-full flex'>
                        <Col xs={24} sm={24} md={8} lg={6}>
                        <Avatar
                            size={{ xs: 200, sm: 200, md: 200, lg: 300, xl: 300, xxl: 300 }}
                            src={profilePicture}
                        />
                        </Col>
                    </div>
                    <div className='width-full flex'>
                        <div >
                            <Title level={2}>Profile Information</Title>
                            <Text><strong>First Name:</strong> {data?.first_name}</Text><br />
                            <Text><strong>Last Name:</strong> {data?.last_name || '--'}</Text><br />
                            <Text><strong>Username:</strong> {data?.username}</Text><br />
                            <Text><strong>Count of Liked Items:</strong> {data?.likedItemsCount || 0} </Text><br />
                            <Text><strong>Count of Purchased Items:</strong> {data?.purchasedItemsCount || 0}</Text><br />
                            <Text><strong>Password:</strong> *********</Text><br />
                        </div>
                    </div>
                </div>
              </Row>
            )} */}
          </div>
        </Content>
      </Layout>
      </Layout>
    </div>
  )
}

export default Profile;
