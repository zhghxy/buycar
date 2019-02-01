import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Store} from "./redux/reducer.js";
import {SettlePage} from "./component/settle_item.jsx";
const srender=()=>{
    console.log(Store.getState());
    ReactDOM.render(
        <SettlePage />,
        document.getElementById("root")
    );
}
Store.subscribe(srender);
srender();

//serviceWorker.unregister();