import React, { Component } from 'react';
import Header from '../Header/Header';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import './OrderReview.css';
import Cart from '../Cart/Cart';
import {Link} from 'react-router-dom';
import CartItem from '../CartItem/CartItem';

class OrderReview extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            isOrdered: false
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
    }

    componentDidMount() {
        const cart = getDatabaseCart();
        const keys = Object.keys(cart);

        const items = keys.map(key => {
            const item = fakeData.find(item => item.key === key);
            item.quantity = cart[key];
            return item;
        });

        this.setState({
            cart: items
        });
    }

    handleRemove(key) {
        const currentKey = this.state.cart.filter(item => item.key !== key);
        this.setState({
            cart: currentKey

        })
        removeFromDatabaseCart(key);
    }

    handleOrder() {
        processOrder(this.state.cart);
        this.setState({
            cart: [],
            isOrdered: true
        })
    }

    render() {
        let itemSection = null;
        let cartSection = null;
        if (this.state.isOrdered) {
            itemSection = <h1>Thank you</h1>
        } else {
            itemSection = this.state.cart.map(item => <CartItem key={item.key} item={item} handleRemove={this.handleRemove}></CartItem>)
          
            cartSection = (<Cart cart={this.state.cart}>
                            <Link to="/shop">
                                <button className="button">
                                    Shop
                                </button>
                            </Link>
                            <Link to="/submit">
                                <button className="button" onClick={this.handleOrder}>
                                    Place order
                                </button>
                            </Link>
                        </Cart>)
        }
        return (
            <div>
                <Header />
                <div className="review-container">
                    <div className="item-container">
                        {itemSection}
                    </div>
                    <div className="cart-container">
                        {cartSection}
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderReview;