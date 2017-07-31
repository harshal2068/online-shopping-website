import React, { Component } from 'react';
import './Cart.css';
import {Link} from 'react-router-dom';
class Cart extends Component {

    constructor() {
        super();
        this.itemPrice = 0;
        this.shippingPrice = 0;
        this.totalBeforeTax = 0;
        this.estmatedTax = 0;
        this.totalPrice = 0;
    }

    render() {
        this.itemPrice = this.props.cart.reduce((sum, item) => {
                            return Math.round((sum + item.price) * 100) / 100;
                        }, 0);
        this.shippingPrice = this.props.cart.reduce((sum, item) => {
                            return sum + item.shipping;
                        }, 0);
        this.totalBeforeTax = Math.round((this.itemPrice + this.shippingPrice) * 100) / 100;
        this.estmatedTax = Math.round(this.totalBeforeTax * 10) / 100;
        this.totalPrice = Math.round((this.totalBeforeTax + this.estmatedTax) * 100) / 100;
        console.log(this.props.cart);
        return (
            <div>
                <h3>Order Summary</h3>
                <p>Items Ordered: {this.props.cart.length}</p>
                
                <div className="cartDescription">
                    <div className="title">Items</div>
                    <div className="value">{this.itemPrice}</div>
                </div>
                <div className="cartDescription">
                    <div className="title">Shipping and Handling</div>
                    <div className="value">{this.shippingPrice}</div>
                </div>
                <div className="cartDescription">
                    <div className="title">Total before tax</div>
                    <div className="value">{this.totalBeforeTax}</div>
                </div>
                <div className="cartDescription">
                    <div className="title">Estimated tax</div>
                    <div className="value">{this.estmatedTax}</div>
                </div>
                <div className="">  
                    <div className="title">Order Total</div>
                    <div className="value">{this.totalPrice}</div>
                </div>
                
                <Link to="/review">
                    <button>
                        Checkout
                    </button>
                </Link>
            </div>
        );
    }
}

export default Cart;