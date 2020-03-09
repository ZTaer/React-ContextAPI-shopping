import React,{useContext} from 'react';
import "./collection-overview.styles.scss";

import CollectionView from "../../components/collection-view/collection-view.component";
import { ShopContext } from '../../providers/shop/shop.provider';

const CollectionOverview  = () => {
    const { collectionShopArray } = useContext( ShopContext );

    return(
        <div className="collection-overview">
            {
                collectionShopArray.map( ( {id,...otherProps} )=>(
                    <CollectionView key={id} {...otherProps} /> 
                ) )
            }
        </div>
    );
}

export default CollectionOverview;