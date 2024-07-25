import { BsDropbox } from "react-icons/bs";
import React, { useState } from 'react';
import { Button, Layout, Menu, theme, Input, Avatar, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, Link, Outlet } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { confirm } = Modal;
import "./dashboard.css";
import { SIGN_OUT } from "../../redux/actions/actions";




const onSearch = (value, _e, info) => console.log(info?.source, value);

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, loading] = useFetch("/auth/profile");
    const dispatch = useDispatch();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const showConfirm = () => {

        confirm({
          title: 'Do you want to log out?',
          icon: <ExclamationCircleFilled />,
          content: 'Remember! All data will be lost.',
          onOk() {
            console.log('OK');
            dispatch({ type: SIGN_OUT});
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

    return (
        <>
            <Layout>
                <Sider className='min-h-screen' trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical w-full h-[80px] ">
                        <img className='w-full h-[80%] p-[10px]' src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
                        <p className='text-[white] text-center '>SHOPIFY</p>
                    </div>
                    <br />
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={[
                            {
                                key: '1',
                                icon: <BsDropbox />,
                                label: <NavLink to={"/dashboard/products"}>Products</NavLink>,
                            },
                            {
                                key: '2',
                                icon: <UserOutlined />,
                                label: <NavLink to={"/dashboard/users"}>Users</NavLink>,
                            },
                        ]}
                    />
                    <div className="p-[10px] flex-1 flex items-end">
                    <Button danger type="primary" className="w-full" onClick={showConfirm}>Log Out</Button>
                    </div>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0 }} className='flex justify-between items-center'>
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
                        <Search className='w-[500px]' placeholder="input search text" onSearch={onSearch} enterButton />
                        <Link to={"/dashboard/profile"} className="flex items-center gap-2 p-5">
                            {
                                loading ? <p className="text-[white]">Loading...</p> : <>
                                    <Avatar style={{ backgroundColor: '#87d068',}}> {data?.first_name.at(0)}</Avatar>
                                    <span className="text-[white]">{data?.first_name}</span>
                                </>
                            }
                        </Link>

                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>

        </>
    );
};

export default Dashboard;
