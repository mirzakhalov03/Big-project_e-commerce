import { BiInfoCircle } from "react-icons/bi"; 
import { BsCartPlus } from "react-icons/bs"; 
import React, { useState, useEffect } from 'react';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
import axios from '../../api';
import './cardDesign.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, PRODUCT_ID } from "../../redux/actions/actions";

const CardDesign = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product/most-popular');
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  const handleAddToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
    console.log(product);
  }

  const handleSinglePage = (productID) => {
    navigate(`/single-product/${productID}`);
    dispatch({ type: PRODUCT_ID, payload: productID });
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
            <button onClick={() => handleAddToCart(product)} className="cardBtns"><BsCartPlus style={{ width: '22px', height: '22px' }} /></button>
            <button onClick={() => handleSinglePage(product._id)} className="cardBtns"><BiInfoCircle style={{ width: '22px', height: '22px' }} /></button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default CardDesign;
