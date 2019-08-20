import React from 'react';
import logo from '../social-logo-social-network-facebook-fb-social-media-icon.svg'


export default class SimpleMenu extends React.Component{
  render(){
      return(
          <div>
            <header id="header" >
                <div className="h1 h2 h3" style={{justifyContent:"space-between"}}>
                <span className="headerS1" style={{fontSize:"1.5em",textTransform:"none",marginLeft:"1%"}}>Quiz App</span>
                <p className="p1 p2" >
                <button onClick={this.props.click}  className="btnp1 btnp2" style={{textTransform:"none",padding:"10px 35px"}}>
                    <span className="sp1">
                    <img src={this.props.img} style={{marginRight:"3px"}} width="30" height="30" alt=""/>
                    {this.props.value}
                    {/* <img src={this.props.menu} width="30" height="30" /> */}
                    </span>

                </button>
                </p>
                </div>
            </header>
          </div>
      )
  }
}