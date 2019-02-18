/**
 * @file 购物页面
 */

import React, { Component } from 'react';
import './App.scss';
import ItemList from './component/Item.jsx'
import {Store} from "./redux/reducer.js"


//右侧导航
class Nav extends Component{
  constructor(props){
    super(props);
   // this.handleClick=this.handleClick.bind(this);
    this.state={
        active:Store.getState().active
    }
  }
  /*handleClick(e){
    let i=0;
    for( i=0;i<this.headList.length;i++){
        if(e.target.innerHTML===this.headList[i])
            break;
    }
    Store.dispatch(activePage(i));
  }*/
  render(){
    const active=Store.getState().active;
    const navList=Store.getState().header.map((e,index)=> (<a key={"nav-"+index} className={"nav-header "+(active===index?"active":"")} href={"#"+e} >{e}</a>));
    return(
        <div className="nav">
            {navList}
        </div>);
  }
}

// 显示购物车总价
class FootBuyCar extends Component{
  constructor(props){
    super(props);
    this.goSettle=this.goSettle.bind(this);
  }
  
  //跳转到结算页面
  goSettle(){
    window.open("../settle.html","settle");
  }

  render(){
    const account=Store.getState().account;
    return(
    <div className="foot-buycar">
      <div className="foot-buycar-detail">
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-buycar"></use>
        </svg>
        <span>{account}</span>
      </div>
      <a className="foot-buycar-settle" onClick={this.goSettle}>结算</a>
    </div>)
  }

}


class App extends Component {
  constructor(props){
    super(props);

  }

  render() {
    const headList=Store.getState().header;
    return (
        <div >
            {headList.map(e=> <ItemList key={e} head={e}/>)}
            <Nav />
            <FootBuyCar />
        </div>
      
    );
  }
}

export default App;
