
import React,{ useContext } from 'react';
import "./collectionpage.styles.scss";
import { withRouter } from 'react-router-dom';
import CollectionItem from '../../components/collection-item/collection-item.component';

import { ShopContext } from '../../providers/shop/shop.provider';

// 使用: context获取数据方法二 | 实战展示( 推荐 - 完成笔记 )
    // 0. hooks的方法: 使用"useContext"获取context数据
    // 1. const xxx = useContext(XXXX);
const CollectionPage = ({ match }) => {
    const collectionsData = useContext(ShopContext);
    const { title, items } = collectionsData[match.params.collectionId];
    return (
        <div className="collection-page">
            <h2 className="title">
                { title }
            </h2>
            <div className="items">
                {
                    items.map( item => ( <CollectionItem key={item.id} item={item} /> ) )
                }
            </div>
        </div>
    );
};

/*
// 使用: context获取数据方法一 | 实战展示( 不推荐 - 完成笔记 )
    // 0. 模型: <XXX.Consumer> { data => return ( jsx ) } </XXX.Consumer>
const CollectionPage = ({ match }) => {
    return(
        <CollectionsContext.Consumer>
            {
                collectionsData => {
                    const { title, items } = collectionsData[match.params.collectionId];
                    return (
                        <div className="collection-page">
                            <h2 className="title">
                                { title }
                            </h2>
                            <div className="items">
                                {
                                    items.map( item => ( <CollectionItem key={item.id} item={item} /> ) )
                                }
                            </div>
                        </div>
                    );
                }
            }
        </CollectionsContext.Consumer>
    );
};
*/

export default withRouter( CollectionPage );