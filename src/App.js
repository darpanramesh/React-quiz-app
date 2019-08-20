import React from 'react';
import './App.css';
import Home from './component/Home'
import Login from './Container/Login'
import {loginWithFacebook,authFunc,logOut} from './config/function'


class App extends React.Component{
  constructor(){
    super();
    this.state={
        user:"",
        photo:"",
        value:false,
    }
}
async login(){
    let x = await loginWithFacebook(); 
    this.setState({
        user:x.displayName,
        photo:x.photoURL
    }) ;

    if(this.state.user === ""){
      alert("Sorry Please connect facebook")
    } 
    else{
      this.setState({value:true})
    }
}
 async componentDidMount(){
      let x = await authFunc();
      if(x){
        this.setState({
          user:x.displayName,
          photo:x.photoURL,
          value:true
      })
      }
  }
    async logOut(){
    console.log("Logout")
    try{
      let user = await logOut();
      console.log(user);
      this.setState({value:false})
    }catch(err){
      console.log(err.message)
    } 
  }
  render(){
    return(
      <div>
        {this.state.value ? 
        <Home  log={this.state.user} img={this.state.photo} logout={this.logOut.bind(this)} /> :
        <Login click={this.login.bind(this)} log="SignIn with Facebook"  />
        }
        </div>
    )
  }
}


export default App;
