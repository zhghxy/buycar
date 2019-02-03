import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import "../css/item.scss";
import {Store} from "../redux/reducer.js";
import {addItem as addToStore} from "../redux/action.js";


export class Item extends React.Component{
    constructor(props){
        super(props);
        this.addItem=this.addItem.bind(this);
    }

    addItem(){
        /*Store.dispatch({
            type:"ADD",
            item:{
                id:this.props.id,
                name:this.props.iname,
                price:this.props.price,
                count:1
            }
        })*/
        Store.dispatch(addToStore({
            id:this.props.mid,
            name:this.props.iname,
            price:this.props.price,
            count:1
        })).then(console.log(Store.getState()));
    }

    render(){
        return(
            <div className="item">
                <img src={require("../photo/1.jpg")}/>
                <div className="item-desc">
                    <div className="item-note">
                        <div className="item-name">{this.props.iname}</div>
                        <div className="item-price">{this.props.price}</div>
                    </div>
                    <a className="item-op" onClick={this.addItem}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-add"></use>
                        </svg>
                    </a>
                </div>
            </div>
        )
    }
}

export default class ItemList extends React.Component{
    constructor(props){
        super(props);
       // Store.dispatch({type:'GET',header:this.props.head});
    }
    render(){
        const list=Store.getState().result.filter(e=>e.header==this.props.head);
        const itemArr=list.map(i=>(<li key={i.name}><Item iname={i.name} price={i.price} mid={i.id}/></li>));
        return(
            <div className="item-list" id={this.props.head}>
                <div className="item-header">{this.props.head}</div>
                <ul>
                    {itemArr}
                </ul>
            </div>
        )
    }
}