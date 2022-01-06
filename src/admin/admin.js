import {Component} from 'react';
import fire from '../config/fire';
import './admin.css';
import pro from '../images/proimg.svg';

class admin extends Component{

    constructor(props){
        super(props);
            this.state={
               name:"",
               password:""
            }
    }
    updateInput = e =>{ 
        this.setState({
        [e.target.name] : e.target.value,
        })
    }

    handleClick = e =>{
        e.preventDefault();
        var db = fire.firestore();
        var usersRef = db.collection('admin');
        usersRef.where("name", "==",this.state.name).where("password","==",this.state.password).get()
        .then(snap => {
            if(snap.empty){
                alert("Your Not Allowerd to entr");
            }
            else{
                snap.forEach(doc => {
                    console.log(doc.data());
                    console.log("Your are Logged In");
                    this.props.history.push("/AdminPanel")});
            }
                   
            })
            .catch((error)=>{
                console.log("Not allowed to enter");
                alert(error);
               });
            
            }

    render(){
        return(
            <div className="admin">
            <div className="admin-page">
           <div className="bgbody"></div>
            <form className="admin-box" onSubmit={this.handleClick}>
                <div className="admin-boximg"></div>
              <h1>Login</h1>
            <input type="text" name="name" placeholder="Username" onChange={this.updateInput} value={this.state.name} />
            <input type="password" name="password" placeholder="Password" onChange={this.updateInput} value={this.state.password} autoComplete="on"/> 
            <input type="submit"  value="Login"/>
            </form> 
            <div className="drawbox">
                <img src={pro} className="proimg" alt="/"></img>
            </div>
            
            </div>
           
          

            </div>
           
        )
    }

}
export default admin;