import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

/**
 * context全局使用配置( 完成笔记 )
 */
import CartProvider from './providers/cart/cart.provider';
import ShopProvider from './providers/shop/shop.provider';
import UserProvider from './providers/user/user.provider';
import DireProvider from './providers/dire/dire.provider';

import './index.css';
import App from './App';

// 展示路由功能的基础标签( 完成笔记 )

// Redux初始化标签必备,获取组件访问权( 完成笔记 )
ReactDOM.render(
    <DireProvider>
    <CartProvider>
    <UserProvider>
    <ShopProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ShopProvider>
    </UserProvider>
    </CartProvider>
    </DireProvider>
    ,
    document.getElementById('root')
);

