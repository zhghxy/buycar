import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

import {Store} from "./redux/reducer.js";
import {initItem,activePage} from "./redux/action.js";

const render=()=>{
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}
Store.subscribe(render);
Store.dispatch(initItem(1));

//页面滚动时设置右侧导航条目高亮
window.addEventListener("scroll",function(){
    const list=document.getElementsByClassName("item-list"),
          scrollTop=document.documentElement.scrollTop,
          rootTop=document.getElementById("root").offsetTop,
          oldActive=Store.getState().active;
    let i=0;
    for(i=0;i<list.length;i++){
        if(list[i].offsetTop+rootTop>=scrollTop)
            break;
    }
    if(i<list.length&&i!=oldActive){
        Store.dispatch(activePage(i));

    }
        
});

render();
