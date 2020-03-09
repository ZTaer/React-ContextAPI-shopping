/**
 * 构建xx.provider.jsx: 将context在全局使用( 推荐使用 - 完成笔记 )
 */
// 0. hooks | context 目前适合中小型项目,不过未来将适应大型项目
    //  a) 原因: 
        // 0. 完整便捷的服务已经在redux社区构建好，可以直接使用。
        // 1. 而hooks因为刚出生不久，功能扩展服务并没有redux完整。
        // 2. 但是hooks在代替class确实很好，至于context确实少些功能，比如数据的跟踪，也是可以实现不过他将比redux更加冗杂并且有些需要自己构建
// 1. xx.provider.jsx构建过程:
    // a) 导入必要组件
    // b) 构建createContext
    // c) 构建Provider

// 导入必要组件
import React,{ createContext, useState, useEffect } from 'react';
import { addItemToCart, lowerCartItem, deleteCartItem } from './cart.utility';

// 构建createContext
    // 注意: 导出用于组件,调用context数据
export const CartContext = createContext({
    hidden: false,
    toggleHidden: ()=>{}, 
    cartItems: [],
    addItem: ()=>{},
    lowerItem: ()=>{},
    deleteItem: ()=>{},
    clearItems: ()=>{},
    cartPriceTotal: 0,
    cartItemsCount: 0,
});

// 构建Provider
    // 注意: 默认导出用于全局配置,通常在app.js
const CartProviderr = ({ children }) => {
    const [ hidden, setHidden ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartPriceTotal, setCartPriceTotal ] =  useState(0);
    const [ cartItemsCount, setCartitemsCount ] = useState(0);

    const toggleHidden = () => setHidden(!hidden);
    const addItem = item => setCartItems(addItemToCart( cartItems, item ));
    const lowerItem = item => setCartItems(lowerCartItem( cartItems, item ));
    const deleteItem = item => setCartItems(deleteCartItem( cartItems, item));
    const itemsCount = cartItems => cartItems.reduce( (total,cur)=>total+cur.quantity,0 ); // 计算商品数量
    const clearItems = () => setCartItems([]);
    const priceTotal =  cartItems => cartItems.reduce( 
        (total,cur)=>total+cur.quantity*cur.price,
    0 ); // 计算总价格

    // 保证当商品数据发生变化时,重新计算
    useEffect( ()=>{
        setCartitemsCount( itemsCount( cartItems ));
        setCartPriceTotal( priceTotal( cartItems ) );
    }, [cartItems]);

    return <CartContext.Provider value={{
        hidden,
        toggleHidden,
        addItem,
        lowerItem,
        deleteItem,
        cartItems,
        cartPriceTotal,
        cartItemsCount,
        clearItems,
    }} >{children}</CartContext.Provider>;
}

export default CartProviderr;