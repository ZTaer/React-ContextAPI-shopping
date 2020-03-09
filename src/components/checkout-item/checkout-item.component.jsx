import React,{useContext} from 'react';
import "./checkout-item.styles.scss";

import { CartContext } from '../../providers/cart/cart.provider';

const CheckoutItem = ({ cartItem }) =>{
    const { name, imageUrl, price, quantity } = cartItem;
    const { addItem, deleteItem, lowerItem } = useContext( CartContext );
    return(
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt=""/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div onClick={ ()=>lowerItem(cartItem) } className="arrow">&#10094;</div>
                    <span className="value">
                        {quantity}
                    </span>
                <div onClick={ ()=>addItem(cartItem) } className="arrow">&#10095;</div>
            </span>
            <span className="price">￥{price}</span>
            <span onClick={ ()=>deleteItem(cartItem) } className="remove-button">
                &#10006;
            </span>
        </div>
    );
}


export default CheckoutItem;