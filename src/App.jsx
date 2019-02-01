import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.scss';
import ItemList from './component/Item.jsx'
import {Store} from "./redux/reducer.js"
import {activePage} from "./redux/action.js"

class Nav extends Component{
  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
    this.state={
        active:Store.getState().active
    }
  }
  handleClick(e){
    let i=0;
    for( i=0;i<this.headList.length;i++){
        if(e.target.innerHTML===this.headList[i])
            break;
    }
    Store.dispatch(activePage(i));
  }
  render(){
    const active=Store.getState().active;
    const navList=Store.getState().header.map((e,index)=> (<a key={"nav-"+index} className={"nav-header "+(active===index?"active":"")} href={"#"+e} onClick={this.handleClick}>{e}</a>));
    return(
        <div className="nav">
            {navList}
        </div>);
  }
}

class FootBuyCar extends Component{
  constructor(props){
    super(props);
    this.goSettle=this.goSettle.bind(this);
  }
  
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
      <Link className="foot-buycar-settle" to="/settle">结算</Link>
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
