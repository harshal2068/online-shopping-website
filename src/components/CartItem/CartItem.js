import React, { Component } from 'react';
import './CartItem.css';
import { convertCurrency } from '../../utilities/convertCurrency';

class CartItem extends Component {
    render() {
        const item = this.props.item;
        return (
            <div className="cart-item">
                <h4>{item.name}</h4>
                <div className="cart-item-container">
                    <div className="cart-item-description">
                        <p className="price">Cost: {convertCurrency.format(item.price)}</p>
                        <p><small>Sold by: {item.seller}</small></p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={()=>this.props.handleRemove(item.key)}>Remove</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItem;