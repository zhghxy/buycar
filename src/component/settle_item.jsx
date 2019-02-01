import React from "react";
import { Store } from "../redux/reducer.js";
import { addItem } from "../redux/action.js";

export class SettleItem extends React.Component{
    constructor(props){
        super(props);
        this.countChange=this.countChange.bind(this);
        this.state={
            count:this.props.count
        }
    }

    countChange(add){
        var oldCount=this.state.count,
            newCount=oldCount+add;
        if(newCount<=this.props.maxCount&&newCount>=0){
            this.setState({
                count:newCount
            })
            Store.dispatch(addItem({name:this.props.name,price:this.props.price,count:add}));
        }
        
    }

    render(){
        
        return(
            <div className='settle-item'>
                <div className="settle-item-name">{this.props.name}</div>
                
                <div className="settle-item-control">
                    <div className="settle-item-count">{this.state.count}</div>
                    <a className='settle-item-operate' onClick={this.countChange.bind(this,1)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-add"></use>
                        </svg>
                    </a>
                    <a className='settle-item-operate' onClick={this.countChange.bind(this,-1)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-sub"></use>
                        </svg>
                    </a>
                </div>
            </div>
        )
    }
}

export class SettlePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const settleList=Store.getState().list.map((val,index)=><SettleItem key={index} name={val.name} count={val.count} price={val.price} />);
        console.log(Store.getState());
        return(
            <div className="settle-list">
                {settleList}
            </div>
        )
    }
}