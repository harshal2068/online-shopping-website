import React, { Component } from 'react';
import './Shop.css';
import ShopItem from '../ShopItem/ShopItem';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
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
        var first10 = fakeData.slice(0,10);
        this.setState({
            items: first10
        });
        console.log(first10);
    }

    addToCart(key){
        var selectedItem = this.state.items.find(item => item.key === key);
        var newCart = [...this.state.cart];
        newCart.push (selectedItem);
        this.setState({
            cart: newCart
        });
        console.log(key);
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
                    <Cart cart={this.state.cart}></Cart>
                </div>
            </div>
        );
    }
}

export default Shop;