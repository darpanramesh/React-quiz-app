import React from 'react'
import SimpleMenu from '../component/topMenu'
import logo from '../social-logo-social-network-facebook-fb-social-media-icon.svg'



export default class Home extends React.Component {
    render(){
        return(
            <div>
                <SimpleMenu click={this.props.click} img={logo} value={this.props.log}  />
                <div className="introDiv">
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                <b className="name">Thar Quiz</b>
                </div>
            </div>
        )
    }
}