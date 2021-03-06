import React from "react";
import { Store } from "../redux/reducer.js";
import { addItem } from "../redux/action.js";
import "../css/settle_item.scss";

//结算页面条目
export class SettleItem extends React.Component{
    constructor(props){
        super(props);
        this.countChange=this.countChange.bind(this);
        this.state={
            count:this.props.count
        }
    }

    //改变商品数量
    countChange(add){
        console.log(add);
        var oldCount=parseInt(this.state.count),
            newCount=oldCount+add;
        if(newCount>=0){
            this.setState({
                count:newCount
            })
            Store.dispatch(addItem({id:this.props.mid,name:this.props.name,price:this.props.price,count:add,image:this.props.image})).then(console.log(Store.getState()));
        }
        
    }

    render(){
        
        return(
            <li className='settle-item'>
                <div className="settle-item-desc">
                    <img className="settle-item-pic" src={require("../photo/"+this.props.image+".jpg")}></img>
                    <div className="settle-item-name">{this.props.name}</div>
                </div>
                
                <div className="settle-item-price">{this.props.price}</div>
                <div className="settle-item-control">
                    <a className='settle-item-operate sub' onClick={this.countChange.bind(this,1)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-add"></use>
                        </svg>
                    </a>
                    <div className="settle-item-count sub">{this.state.count}</div>
                    <a className='settle-item-operate sub' onClick={this.countChange.bind(this,-1)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-sub"></use>
                        </svg>
                    </a>
                </div>
                <div className="settle-item-account ">{Math.round(100*this.state.count*this.props.price)/100}</div>
            </li>
        )
    }
}

export class SettlePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const settleList=Store.getState().list.map((val)=><SettleItem key={val.id} mid={val.id} name={val.name} count={val.count} price={val.price} image={val.image}/>);
        const settleAccount=Store.getState().account;
        //console.log(Store.getState());
        return(
            <ul className="settle-list">
                <li className='settle-list-head'>
                    <span>商品详情</span>
                    <span>单价</span>
                    <span>数量</span>
                    <span>总价</span>
                </li>
                {settleList}
                <li className='settle-account'>
                    <span>总计</span>
                    <span>{settleAccount}元</span>
                </li>
            </ul>
        )
    }
}