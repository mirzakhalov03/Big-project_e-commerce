import React from 'react';
import { Layout, Menu, Spin, Typography, Row, Col, Avatar, theme } from 'antd';
const { Header, Content } = Layout;
const { Title, Text } = Typography;
import useFetch from '../../hooks/useFetch';

const items = new Array(5).fill(null).map((_, index) => ({
  key: `sub${index + 1}`,
  label: `nav ${index + 1}`,
}));

const Profile = () => {
  const [data, loading] = useFetch("/auth/profile");

  console.log(data)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const profilePicture = data?.photo_url || 'https://via.placeholder.com/300';

  return (
    <div>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
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
            padding: '0 48px',
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
              padding: 24,
              width: '100%',
              borderRadius: borderRadiusLG,
            }}
          >
            {loading ? (
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
            )}
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default Profile;
