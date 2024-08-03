import { ImCross } from "react-icons/im"; 
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"; 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../../components/nav/Nav';
import { Button, Table } from 'antd';
import { REMOVE_FROM_CART} from "../../redux/actions/actions"; 

const Cart = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    const handleQuantityChange = (key, increment) => {
        const updatedItems = cartItems.map(item => {
            if (item.key === key) {
                const newQuantity = item.quantity + increment;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
            }
            return item;
        });
        dispatch({ type: UPDATE_CART, payload: updatedItems });
    };

    const handleRemove = (key) => {
        const updatedItems = cartItems.filter(item => item.key !== key);
        dispatch({ type: REMOVE_FROM_CART, payload: updatedItems });
    };

    const formattedCartItems = cartItems?.map(item => {
        console.log(item);
        return { ...item, image: item.product_images[0], name: item.product_name, price: item.sale_price, quantity: item.quantity };
    });

    console.log(formattedCartItems);

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
                    <button onClick={() => handleQuantityChange(record.key, -1)} className='text-white w-full flex items-center justify-center text-xl rounded'>
                        <AiOutlineMinusCircle />
                    </button>
                    <span className='text-2xl text-white'>{record.quantity}</span>
                    <button onClick={() => handleQuantityChange(record.key, 1)} className='text-white w-full flex items-center justify-center text-xl rounded'>
                        <AiOutlinePlusCircle />
                    </button>
                </div>
            ),
        },
        {
            title: 'Total',
            key: 'total',
            render: (text, record) => <span>${record.price * record.quantity}</span>
        }
    ];

    return (
        <div>
            <Nav />
            <div className="container">
                <h1 className='text-4xl p-3'>Cart</h1>
                <Table columns={columns} dataSource={formattedCartItems} />
            </div>
        </div>
    );
}

export default Cart;
