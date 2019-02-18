import React from 'react';
import ReactDOM from 'react-dom';
import {Store} from "./redux/reducer.js";
import {initItem} from "./redux/action.js";
import {SettlePage} from "./component/settle_item.jsx";

Store.dispatch(initItem(1));
const render=()=>{
    console.log(Store.getState());
    ReactDOM.render(
        <div>
            <h3>购物车</h3>
            <SettlePage />
        </div>,
        document.getElementById("root")
    );
}
Store.subscribe(render);
render();
