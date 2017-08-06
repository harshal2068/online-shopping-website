import React, { Component } from 'react';
import './Shop.css';
import ShopItem from '../ShopItem/ShopItem';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import {Link} from 'react-router-dom';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            cart: []
        }

        this.addToCart = this.addToCart.bind(this);
    }
    
    componentDidMount() {
        const first10 = fakeData.slice(0,10);
        this.setState({
            items: first10
        });

        const cart = getDatabaseCart();
        const keys = Object.keys(cart);
        const items = keys.map(key => {
            const item = fakeData.find(itm => itm.key === key);
            item.quantity = cart[key];
            return item;
        });
        this.setState({
            cart: items
        });
    }

    addToCart(key){
        const selectedItem = this.state.items.find(item => item.key === key);
        const newCart = [...this.state.cart];
        newCart.push (selectedItem);

        const newCartCount = Object.assign({}, this.state.cartCount);
        const newCount = (newCartCount[key] || 0) + 1;
        newCartCount[key] = newCount;
        this.setState({
            cart: newCart,
            cartCount: newCartCount
        });

        addToDatabaseCart(key, newCount);
    }
    
    render() {
        return (
            <div className="shop-container">
                <div className="items-container">
                    <h1>Shop these item</h1>
                    {this.state.items.map(item => (
                        <ShopItem key={item.key} 
                                item={item}
                                addToCart = {this.addToCart}>
                            {item.name}
                        </ShopItem>)
                    )}
                </div>
                <div className="cart-container">
                    <h1>This is cart</h1>
                    <Cart cart={this.state.cart}>
                        <Link to="/review">
                            <button className="checkOutButton">
                                Checkout
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
        );
    }
}

export default Shop;