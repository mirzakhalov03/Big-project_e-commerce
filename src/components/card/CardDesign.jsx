import { BsCartPlus } from "react-icons/bs"; 
import { AiOutlineShoppingCart, AiOutlineHeart  } from "react-icons/ai"; 
import React, { useState, useEffect } from 'react';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
import axios from '../../api';
import './cardDesign.scss';

const CardDesign = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product/most-popular');
        if (Array.isArray(response.data.payload)) {
          setData(response.data.payload);
          console.log(response?.data?.payload);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }


  return (
    <div className="card-container flex flex-wrap">
      {data.map((product, index) => (
        <Card
        
            key={product.id || index + 1}
            style={{ width: 300, height: 450, margin: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}
            cover={<img style={{ height: 300, objectFit: 'cover', padding: '10px' }} alt={product.name} src={product.product_images[0]} />}
          >
          
          <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            title={product.name}
            description={truncateDescription(product.description, 70)}
          />
          <div className="cardBtnsContainer">
            <button className="cardBtns"><BsCartPlus style={{ width: '22px', height: '22px' }} /></button>
            <button className="cardBtns"><AiOutlineHeart style={{ width: '22px', height: '22px' }} /></button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default CardDesign;
