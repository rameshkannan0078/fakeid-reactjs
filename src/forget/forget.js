import { Component} from "react";
import forget_svg from '../images/forget-password.svg';

import '../forget/forget.css';
import fire from '../config/fire';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
class forget extends Component{
    constructor(props){
      super(props);
      this.state={
          password:"",
      }
    }
    onChange = e =>{
        this.setState({
            [e.target.name] : e.target.value,
           
          })
    }
    passwordChanger = e =>{
       e.preventDefault();
        fire.auth().sendPasswordResetEmail(this.state.password).then((e)=>{
            confirmAlert({
                title: 'Email has Been Send Successfully',
                message: 'want to go back homepage',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => this.props.history.push("/profile")
                  },
                  {
                    label: 'No',
                    onClick: () => alert('Click No')
                  }
                ]
              });
        }).catch((error)=>{
            alert(error);

        })
    }

    render(){
        return(
          <div class="forgetbody">
            <div class="fgimg"> 
          <div className="forgetbox">
           <div class="forget-password">
               <form onSubmit={this.passwordChanger}>
                <p className="forget-password-text">Enter your E-mail address to send<br></br>Invite link to Login</p>
                <img src={forget_svg} alt="forgetpassword"/>
               <input type="email" name="password" onChange={this.onChange} value={this.state.password} required/><br></br>
               <button className="forget-password-submit" onClick={this.Dialogsubmit}>submit</button>
              </form>
             </div> 
          </div> 
          </div>
          </div>
        );

    }
}

export default forget;