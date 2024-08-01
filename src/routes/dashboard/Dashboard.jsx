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
import shopifyLogo from "./shopifyLogo.png";






const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, loading] = useFetch("/auth/profile");
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();


    const onChange = (e) => setSearchQuery(e.target.value)
    
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
      console.log(data?.photo_url)

    return (
        <>
            <Layout>
                <Sider className='min-h-screen' trigger={null} collapsible collapsed={collapsed}>
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
                                icon: <BsDropbox />,
                                label: <NavLink to="/dashboard" activeClassName="active-link">Products</NavLink>,
                            },
                            {
                                key: '2',
                                icon: <UserOutlined />,
                                label: <NavLink to="/dashboard/users" activeClassName="active-link">Users</NavLink>,
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
                        <Search className='w-[500px]' placeholder="Search products..."  onChange={onChange} enterButton />
                        <Link to={"/dashboard/profile"} className="flex items-center gap-2 p-5">
                            {
                                loading ? <p className="text-[white]">Loading...</p> : <>
                                    <Avatar style={{ backgroundColor: 'dodgerblue',}} > 
                                    {
                                        data?.photo_url ? <img style={{objectFit: "cover", width: "40px", height: "40px"}} src={data?.photo_url} alt="" /> : data?.first_name.at(0)
                                    }
                                    </Avatar>
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
                        <Outlet context={[searchQuery]} />
                    </Content>
                </Layout>
            </Layout>

        </>
    );
};

export default Dashboard;
