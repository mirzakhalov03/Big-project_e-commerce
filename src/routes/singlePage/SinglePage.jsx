import { BsCart4 } from "react-icons/bs"; 
import { AiOutlineHeart } from "react-icons/ai"; 
import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav/Nav';
import axios from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tag, Carousel } from 'antd';
import { ADD_TO_CART } from "../../redux/actions/actions";

const SinglePage = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const dispatch = useDispatch();
    const productID = useSelector((state) => state.productID);

    const handleAddToCart = (product) => {
        dispatch({ type: ADD_TO_CART, payload: product });
        console.log(product);
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('/product/single-product/' + productID);
                if (response.data.payload) {
                    setData(response.data.payload);
                } else {
                    console.error('Expected product data but got:', response.data.payload);
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product:', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productID]);

    const discount = (data.original_price - data.sale_price) / data.original_price * 100;

    const handleImageClick = (index) => {
        setMainImageIndex(index);
    }

    return (
        <div className='body w-screen h-screen'>
            <Nav />
            <div className="container">
                <h1 className='text-4xl p-3'>Product Overview</h1>
                <div className="product__wrapper w-full bg-gray-100 h-[600px] rounded-xl flex p-4  gap-4">
                    <div className="product-imgs w-full h-full flex gap-5">
                        <div className="side-imgs w-[150px] h-full flex flex-col justify-center items-center gap-2">
                            {data.product_images && data.product_images.map((img, index) => (
                                <div key={index} onClick={() => handleImageClick(index)} className='side-img w-[140px] h-[140px] bg-gray-200 rounded-2xl cursor-pointer'>
                                    <img src={img} alt={`Product Image ${index + 1}`} className='w-full h-full object-contain rounded-2xl' />
                                </div>
                            ))}
                        </div>
                        <div className='main-img w-[540px] h-full bg-gray-200 rounded-2xl'>
                            {data.product_images && (
                                <Carousel arrows autoplay initialSlide={mainImageIndex}>
                                    {data.product_images.map((img, index) => (
                                        <div key={index}>
                                            <img src={img} alt={`Main Product Image ${index + 1}`} className='w-full h-full object-cover rounded-2xl' />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                        </div>
                    </div>
                    <div className="product-info w-full h-full">
                        <h2 className='text-3xl'>{data?.product_name || "Product Name" }</h2>
                        <Tag color="geekblue">{data?.category || "Category"}</Tag>
                        <br />
                        <br />
                        <div className='description w-full h-[160px] overflow-y-auto'>
                            <p className='text-xl text-[#5d5d5d]'>{data?.description || "Description not available."}</p>
                        </div>
                        <br />
                        <h2 className='text-xl'>Product Type: <strong>{data?.product_type || '--'}</strong></h2>
                        <h2 className='text-xl'>In Stock: <strong>{data?.number_in_stock || '--'} </strong></h2>
                        <br />
                        <div className='flex w-full items-center justify-between'>
                            <div className='price w-[180px] p-1 flex gap-2 items-end bg-[#fcf2b8] border-4 rounded-lg border-[#ffd900] justify-center'>
                                <h2 className='text-red-500 text-2xl'><strong>${data?.sale_price}</strong></h2>
                                <h2 className='text-[12px]'><strike>${data?.original_price}</strike>/<span className='text-[#08cb3c]'>{Math.floor(discount)}% off</span></h2>
                            </div>
                            <Button className="rounded-full p-0 h-[35px] w-[35px] flex items-center justify-center" danger>
                                <AiOutlineHeart className="w-[20px] h-[20px]" />
                            </Button>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <Button onClick={() => handleAddToCart(data)} type="primary" className="rounded-full p-0 h-[35px] w-[150px] flex items-center justify-center">
                            <BsCart4 style={{ width: '20px', height: '20px' }} /> Add to cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePage;
