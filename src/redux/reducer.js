import {createStore,applyMiddleware} from "redux";
import thunk from 'redux-thunk';

const initState={
    result:[],
    header:[],
    list:[],
    account:0,
    active:0
}

export const Reducer=(state=initState,action)=>{
    switch(action.type){
        case 'INIT':
            return Object.assign({},state,{ result:action.result });
        case 'GET':
            return state;
        case 'INIT-HEADER':
            return Object.assign({},state,{header:action.headerList})
        case 'ACTIVE':
            return Object.assign({},state,{active:action.active})
        case 'ADD':{
            let newState=Object.assign({},state);
            let flag=false;
            //该物品原来已经加入了购物车，现在改变数量
            newState.list.forEach( (e,index,array) => {
                if(e.name==action.item.name){
                     e.count+=action.item.count;
                     flag=true;
                }
                if(e.count===0)
                    array.splice(index,1);
            });
            //之前不再购物车，直接加入list
            if(!flag){
                newState.list.push(action.item);
            }
            newState.account+=action.item.price*action.item.count;
            return newState;
        }
            default:
            return state
    }
}

export const Store=createStore(Reducer,applyMiddleware(thunk));