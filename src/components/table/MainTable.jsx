import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import axios from '../../api';
import { useOutletContext } from 'react-router-dom';

const columns = [
    {
        title: 'ID',
        key: 'id',
        render: (_, __, index) => index + 1,
    },
    {
        title: 'Image',
        dataIndex: 'product_images',
        key: 'product_images',
        render: (images) => <img src={images[0]} alt="product" style={{ width: '50px' }} />,
    },
    {
        title: 'Name',
        dataIndex: 'product_name',
        key: 'product_name',
    },
    {
        title: 'Price',
        dataIndex: 'sale_price',
        key: 'sale_price',
        render: (text) => <span>${text}</span>
    },
    {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
        render: (category) => (
            <Tag color="blue">
                {category.toUpperCase()}
            </Tag>
        ),
    },
];

const MainTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery] = useOutletContext();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/product/all');
                if (Array.isArray(response.data.payload)) {
                    setData(response.data.payload);
                } else {
                    console.error('Expected array but got:', response.data.payload);
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = data.filter(product => 
        product.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return <Table dataSource={filteredProducts} columns={columns} loading={loading} rowKey="_id" />;
};

export default MainTable;
