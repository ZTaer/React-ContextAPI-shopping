import React,{useContext} from 'react';
import "./cart-icon.styles.scss";
import { ReactComponent as CartIconSvg } from "../../assets/shopping-bag.svg";
import { CartContext } from '../../providers/cart/cart.provider';

// 购物车按钮context实战: 使用context函数( 完成笔记 )
const CartIcon = () => {
    const { toggleHidden, cartItemsCount } = useContext( CartContext );
    return(
        <div className="cart-icon" onClick={toggleHidden} >
            <CartIconSvg className="shopping-icon" />
            <span className="item-count">
                {cartItemsCount}
            </span>
        </div>
    );
}

export default CartIcon;