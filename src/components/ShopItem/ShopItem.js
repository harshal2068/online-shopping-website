import React, { Component } from 'react';
import './ShopItem.css';
import Rating from 'react-rating';
import '../../../node_modules/font-awesome/css/font-awesome.css'
class ShopItem extends Component {
    render() {
        return (
            <div className="item">
                {/*<h1>This is shop item: {this.props.item.name}</h1>*/}
                <div>
                    <img src={this.props.item.img} alt=""/>
                </div>
                
                <div className="itemDescription">
                    <h4 className="item-header">
                        {this.props.item.name}
                    </h4>
                    <p>by: {this.props.item.seller}</p>
                    <div className="item-description">
                        <div>
                            <p>${this.props.item.price}</p>
                            <p><small> only {this.props.item.stock} left in stock order soon
                                </small></p>

                            <button onClick={() => this.props.addToCart(this.props.item.key)}>
                                Add to Cart
                            </button>
                        </div>
                        <div>
                            <Rating 
                                className="rating"
                                empty="fa fa-star-o"
                                full = "fa fa-star"
                                placeholder="fa fa-star"
                                placeholderRate={this.props.item.star}
                                readonly
                            > </Rating>
                            <h4>Features</h4>
                            <ul>
                                {this.props.item.features.map(ftr => 
                                    <li>{ftr.description}: <strong>{ftr.value}</strong></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShopItem;