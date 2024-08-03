import { ImCross } from "react-icons/im"; 
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"; 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../../components/nav/Nav';
import { Button, Table } from 'antd';
import { REMOVE_FROM_CART, INCREMENT, DECREMENT,  } from "../../redux/actions/actions"; 

const Cart = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    const handleIncrement = (key) => {
        console.log(key);
        dispatch({ type: INCREMENT, payload: key });
        
    };

    const handleDecrement = (key) => {
        const updatedItems = cartItems.map(item => {
            if (item.key === key) {
                const newQuantity = item.quantity - 1;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }; 
            }
            return item;
        });
        dispatch({ type: DECREMENT, payload: updatedItems });
    };

    const handleRemove = (key) => {
        // console.log(key);
        dispatch({ type: REMOVE_FROM_CART, payload: key });
        // console.log(cartItems);
        // localStorage.setItem('cart', JSON.stringify(cartItems.filter(item => {console.log(item); return item.key !== key})));
    };

    const formattedCartItems = cartItems?.map(item => ({
        ...item,
        key: item._id,
        image: item.product_images[0],
        name: item.product_name,
        price: item.sale_price,
        quantity: item.quantity || 1 
    }));

    const columns = [
        {
            render: (text, record) => (
                <Button danger onClick={() => handleRemove(record.key)}>
                    <ImCross />
                </Button>
            ),
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt="product" style={{ width: '50px' }} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`,
        },
        {
            title: 'Quantity',
            key: 'quantity',
            render: (text, record) => (
                <div className='text-center w-[100px] flex items-center justify-between bg-blue-300 rounded-lg'>
                    <button onClick={() => handleDecrement(record.key)} className='text-white w-full flex items-center justify-center text-xl rounded'>
                        <AiOutlineMinusCircle />
                    </button>
                    <span className='text-2xl text-white'>{record.quantity}</span>
                    <button onClick={() => handleIncrement(record.key)} className='text-white w-full flex items-center justify-center text-xl rounded'>
                        <AiOutlinePlusCircle />
                    </button>
                </div>
            ),
        },
        {
            title: 'Total',
            key: 'total',
            render: (text, record) => <span>${(record.price * record.quantity).toFixed(2)}</span> // Ensure total is displayed as a fixed-point number
        }
    ];

    return (
        <div>
            <Nav />
            <div className="container">
                <h1 className='text-4xl p-3'>Cart</h1>
                <Table columns={columns} dataSource={formattedCartItems} rowKey={(item) => item.key} />
            </div>
        </div>
    );
}

export default Cart;
