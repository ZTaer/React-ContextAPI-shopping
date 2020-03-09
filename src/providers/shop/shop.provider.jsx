import React,{ createContext, useState, useEffect } from 'react';
import SHOP_DATA from './shop.data';
import { objectToArray } from './shop.utilis';

// 构建createContext
    // 注意: 导出用于组件,调用context数据
export const ShopContext = createContext({
    collectionShop: null,
    collectionShopArray: [],
});

// 构建Provider
    // 注意: 默认导出用于全局配置,通常在app.js
const ShopProvider = ({ children }) => {
    const [ collectionShop, setCollectionShop ] = useState( SHOP_DATA );
    const [ collectionShopArray, setCollectionShopArray ] = useState([]);

    const getArrayData = data => setCollectionShopArray(objectToArray( data )); // 二次加工数据函数不可被传递,否则会报错( 等待笔记 )

    useEffect( ()=>{
        if( collectionShop ){
            getArrayData( collectionShop )
        }
    },[collectionShop] );

    return (
        <ShopContext.Provider value={{
            collectionShop,
            collectionShopArray,
        }} >
            {children}
        </ShopContext.Provider>
    );
}

export default ShopProvider;