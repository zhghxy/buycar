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
            return Object.assign({},state,{ account:action.list.reduce(function(pre,cur){
                return pre+cur.count*cur.price;
            },0),result:action.result,header:action.header,list:action.list });
        case 'GET':
            return state;
        case 'INIT-HEADER':
            return Object.assign({},state,{header:action.headerList})
        case 'ACTIVE':
            return Object.assign({},state,{active:action.active})
        case 'ADD':{
            let newState=Object.assign({},state);
            let flag=false,di=-1;;
            //该物品原来已经加入了购物车，现在改变数量
            newState.list.forEach( (e,index) => {
                if(e.name==action.item.name){
                     e.count=parseInt(e.count)+action.item.count;
                     flag=true;
                }
                if(e.count===0)
                    di=index;
            });
            
            if(di>=0)
                newState.list.splice(di,1);
            console.log(newState);
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