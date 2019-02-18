import React from "react";
import LazyLoad from 'react-lazyload';
import "../css/item.scss";
import {Store} from "../redux/reducer.js";
import {addItem as addToStore} from "../redux/action.js";


export class Item extends React.Component{
    constructor(props){
        super(props);
        this.addItem=this.addItem.bind(this);
    }

    addItem(){
       
        Store.dispatch(addToStore({
            id:this.props.mid,
            name:this.props.iname,
            price:this.props.price,
            image:this.props.image,
            count:1
        }));
    }

    render(){
        const imgSrc="2";
        return(
            <div className="item">
                <LazyLoad>
                <img src={require("../photo/"+this.props.image+".jpg")}/>
                </LazyLoad>
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
        const itemArr=list.map(i=>(<li key={i.name}><Item iname={i.name} price={i.price} mid={i.id} image={i.image}/></li>));
        return(
            <div className="item-list" id={this.props.head}>
                <div className='item-header'>
                    <img src="https://img.alicdn.com/tfs/TB12NNMD9zqK1RjSZFLXXcn2XXa-120-48.png"></img>
                    <h3>{this.props.head}</h3>
                    <img src="https://img.alicdn.com/tfs/TB12NNMD9zqK1RjSZFLXXcn2XXa-120-48.png"></img>
                </div>
                
                <ul>
                    {itemArr}
                </ul>
            </div>
        )
    }
}