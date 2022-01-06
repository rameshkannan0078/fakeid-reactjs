import { Component } from "react";
import React from 'react';
import google  from  "../images/google.png";
import fire from "../config/fire";
import login from'../images/login.svg';
import './login.css';
import '../App';




class Login extends Component{

constructor(props){
    super(props);
    this.state={
      toggleState:1,
      name:"",
      phoneno:"",
      email:"",
      password:"",
      isAuthenticated:false,
      complete:0,

    }
  
  }
  toggleTab= (index) =>{
    this.setState({toggleState:index})
  }
 
  
  updateInput = e => {
    this.setState({
      [e.target.name] : e.target.value,
     
    })
  }



  handleLogin = e =>{
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
      localStorage.setItem("isAuthenticated", "true");
      window.$emailauth=this.state.email;
    }
    ).catch((error)=>{
     alert(error);
    })
    
  }

  setUpRecaptcha = () =>{
    window.recaptchaVerifier=new fire.auth.RecaptchaVerifier(
      "recaptcha-container",{
        size:"invisible",
        callback:function(response){
        this.handleClick();
        }
      }
    );

  };
  
   handleClick = (event) =>{
     event.preventDefault();
     var db = fire.firestore();
     var usersRef = db.collection('login');
     usersRef.where('phoneno', '==', this.state.phoneno).get()
  
     .then(snapshot => {
      if (snapshot.empty) {
        var db = fire.firestore();
     var usersRef = db.collection('login');
     usersRef.where('name', '==', this.state.name).get().then(snapshot=>{
       if(snapshot.empty){
        const phoneNumber = "+91"+this.state.phoneno;
        this.setUpRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        fire.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              var Verificationcode=prompt("Enter the 6 Digit OTP:");

              window.confirmationResult = confirmationResult;
              confirmationResult.confirm(Verificationcode).then((result) => {
                var createemail=this.state.email;
                var createpassword=this.state.password;
                fire.auth().createUserWithEmailAndPassword(createemail,createpassword).then(createdUser => {
                  console.log(createdUser);
                  db.collection('login').doc(this.state.email).set({
                   name: this.state.name,
                   phoneno:this.state.phoneno,
                   email:this.state.email,
                   password:this.state.password
                 }).then( ()=> {
                  var realtime=fire.database();
                 realtime.ref('users/'+this.state.name+'/').set({
                   email:this.state.email,
                   name:this.state.name,
                   phoneno:this.state.phoneno,
                   complete:0,
                  })
    
                   })
                   .catch(function (error) {
                   console.error("Error writing Value: ", error);
                   });  
                 this.setState({
                   name:"",
                   phoneno:"",
                   email:"",
                   password:"",
                  
                  });;
                  console.log("User has been gona create");
             })
             .catch(err => {
               console.log('Error: ', err);
             }) 
                // ...
              }).catch((error) => {
                alert(error);
              });
              
            }).catch((error) => {
             alert(error);
            }); 

       }
       else{
         alert('userName is Already Exist,Please Create differ');
       }
     })
        
      } 
      else {
           throw alert('Phone Number is already taken');
      } 
    })
  
    
  };


  googlepro = () =>{
    var provider = new fire.auth.GoogleAuthProvider();
    fire.auth()
  .signInWithPopup(provider)
  .then((result) => {

  }).catch((error) => {
    console.log(error);
  });
  }
  componentDidMount = () =>{
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
      var  prowalk=this.state.email;
       console.log("user Signed In")
       this.props.history.push({pathname: '/profile',
       state:{prowalk}})
      } else {
        console.log("No user is Signed In")
      }
    });
  }

  gotoAdmin = () =>{
    this.props.history.push('/admin')
  }
 render(){
  return (
    
  <div className="log">
    
      <div className="big-box">
     <div className="react-main-box">
     <div class="container5">
  <div class="row">
    <div class="col-sm">
      <img src={login} className="login-image-svg" alt='' />
    </div>
    <div class="col-sm">
    <div className="container1">
      
      <div className="bloc-tabs">
        <button
          className={this.state.toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => this.toggleTab(1)}
        >
          Log In
        </button>
        <button
          className={this.state.toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => this.toggleTab(2)}
        >
          Sign Up
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={this.state.toggleState === 1 ? "content  active-content" : "content"}
        >
          <hr />
        <form onSubmit={this.handleLogin}>
        <input type="text" name="email" placeholder="  Enter Your Username" id="inputText" onChange={this.updateInput} value={this.state.email} required>
        </input><br></br>
        <input type="password" name="password" placeholder="  Enter Your PassWord" onChange={this.updateInput} value={this.state.password} required ></input><br></br>
        <a href="/forget" id="forget-password">Forget password?</a>
        <button id="button1">
          Log In
          
        </button>
        </form>
        <div className="separator">Connect With</div>
        <div className="row-box">
                <button className="google" onClick={this.googlepro}><img src={google} alt="google" /><label> Sign In with Google</label></button>
         </div> 
         <label></label>
         <div id="recaptcha-container"></div>
        <button id="admin" onClick={this.gotoAdmin}>Admin</button>
        </div>

        <div
          className={this.state.toggleState === 2 ? "content  active-content" : "content"}
        >
          <hr />
        <form  onSubmit={this.handleClick} >
          <input type="text" name="name" placeholder="  Enter Your Username" onChange={this.updateInput} value={this.state.name}  required>
        </input><br></br>
        <input type="text" name="phoneno" placeholder="  Enter Your PhoneNo" onChange={this.updateInput} value={this.state.phoneno}  required>
        </input><br></br>
        <input type="email" name="email" placeholder="  Enter Your Email" onChange={this.updateInput} value={this.state.email} > 
        </input><br></br>
        <input type="password" name="password" minlength="7" placeholder="  Enter your password" onChange={this.updateInput} value={this.state.password} >
        </input><br></br>
        <button id="button1" type="submit">
          Sign up
        </button>
        </form>
        <div className="separator">Connect With</div>
        <div className="row-box">
          <button className="google" onClick={this.googlepro}><img src={google} alt="google"/><label> Sign Up with Google</label></button>
         </div> 
        </div>

      </div>
    </div>
    </div>
  </div>
</div>

     </div>
    
     </div>
  </div>
  );
}
}


export default Login;