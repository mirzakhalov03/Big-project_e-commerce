import { Space, Table, Tag } from 'antd';
import useFetch from '../../../hooks/useFetch';
import axios from '../../../api';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PROMOTE, PROMOTE_FAILURE, PROMOTE_SUCCESS } from '../../../redux/actions/actions';





const Users = () => {
  const [profileData] = useFetch("/auth/profile");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();


  
  const handlePromote = async (user) => {
    dispatch({ type: PROMOTE, payload: user._id });

    try {
      const response = await axios.put('/admin/add-admin', { username: user.username });
      if (response.data.success) {
        dispatch({ type: PROMOTE, payload: { id: user._id } });
        console.log('Promoted user with ID:', user._id);
      } else {
        console.error('Failed to promote user');
      }
    } catch (error) {
      console.error('Failed to promote user:', error);
      console.log("Teacher, I tried my best to make it work but unfortunatelly even ChatGPT coudn't help :( ");
      console.log("I cannot understand why it didn't work");
      dispatch({ type: PROMOTE_FAILURE, error: error.message });
    }
  };

    const columns = [
      {
        title: 'ID',
        key: 'id',
        render: (_, __, index) => index + 1,
      },
      {
        title: 'Name',
        dataIndex: 'first_name',
        key: 'first_name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Liked Items',
        key: 'likedItemsCount',
        dataIndex: 'likedItemsCount',
        render: (likedItemsCount) => (
          <Tag color={likedItemsCount > 0 ? 'geekblue' : 'volcano'}>
            {likedItemsCount > 0 ? likedItemsCount : 'None'}
          </Tag>
        ),
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={() => handlePromote(record)}>Promote {record.name} to Admin</button>
          </Space>
        ),
      },
    ];




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/admin/registered-users');
        if (Array.isArray(response?.data?.payload)) {
          setData(response?.data?.payload);
        } else {
          console.error('Expected array but got:', response?.data?.payload);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    


    
    <div>
      {
        profileData?.role === "user" ? <h1 className='text-center font-bold text-2xl'>Sorry, you don't have permission to access this page</h1> : <Table columns={columns} dataSource={data} rowKey={record => record._id} loading={loading} />
      }
    </div>
  );
}

export default Users;
