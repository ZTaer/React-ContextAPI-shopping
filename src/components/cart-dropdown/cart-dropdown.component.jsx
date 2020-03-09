import React,{useContext} from 'react';
import "./cart-dropdown.styles.scss";

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { withRouter } from 'react-router-dom';

import { CartContext } from '../../providers/cart/cart.provider';

const CartDropdown = ({ history }) => {
    const { toggleHidden, cartItems } = useContext( CartContext );
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ? 
                    cartItems.map( cur => (<CartItem key={cur.id} item={cur} />) ) :
                    (<span className="cart-items-alt" >你购物车是空的!</span>)
                }
            </div>
            <CustomButton 
            onClick={ ()=>{
                toggleHidden();
                history.push('/checkout');
            } } 
            selfCss={
                'cart-dropdown-btn'
            } >
                结算
            </CustomButton>
        </div>
    );
}

// withRouter与redux的connect嵌套并不冲突(完成笔记)
    // 0. 正常使用即可
export default withRouter(CartDropdown);