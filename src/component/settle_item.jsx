import React from "react";
import { Store } from "../redux/reducer.js";
import { addItem } from "../redux/action.js";
import "../css/settle_item.scss";
export class SettleItem extends React.Component{
    constructor(props){
        super(props);
        this.countChange=this.countChange.bind(this);
        this.state={
            count:this.props.count
        }
    }

    countChange(add){
        console.log(add);
        var oldCount=parseInt(this.state.count),
            newCount=oldCount+add;
        if(newCount>=0){
            this.setState({
                count:newCount
            })
            Store.dispatch(addItem({id:this.props.mid,name:this.props.name,price:this.props.price,count:add})).then(console.log(Store.getState()));
        }
        
    }

    render(){
        
        return(
            <tr className='settle-item'>
                <td className="settle-item-name">{this.props.name}</td>
                <td className="settle-item-control">
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
                </td>
                <td className="settle-item-account ">{this.state.count*this.props.price}</td>
            </tr>
        )
    }
}

export class SettlePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const settleList=Store.getState().list.map((val,index)=><SettleItem key={index} mid={val.id} name={val.name} count={val.count} price={val.price} />);
        console.log(Store.getState());
        return(
            <table className="settle-list">
                <tr className='settle-list-head'>
                    <th>商品详情</th>
                    <th>数量</th>
                    <th>总价</th>
                </tr>
                {settleList}
            </table>
        )
    }
}