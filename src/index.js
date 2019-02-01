import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import {SettlePage} from './component/settle_item.jsx';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import {Store} from "./redux/reducer.js";
import {initItem,setHeader, activePage} from "./redux/action.js";

const render=()=>{
    ReactDOM.render(
        <BrowserRouter>
            <div>
            <Route exact path="/" component={App} />
            <Route path="/settle" component={SettlePage} />
            </div>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
Store.subscribe(render);
Store.dispatch(setHeader()).then(()=>console.log(Store.getState()));;
Store.dispatch(initItem(1)).then(()=>console.log(Store.getState()));
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
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
