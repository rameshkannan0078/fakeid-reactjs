import { Component } from "react";
import "./profile.css";
import fire from "../config/fire"; 
import 'bootstrap/dist/css/bootstrap.min.css';



class Profile extends Component{
  
  constructor(props){
    super(props);
    this.state={
      link:'',
      nameValue1:'',
    }
  }

  updateInput = e => {
    this.setState({
      [e.target.name] : e.target.value,
     
    })
  }


  handlesignout = () =>{
    fire.auth().signOut().then(() => {
        this.props.history.push("/login")
      }).catch((error) => {
          alert(error);
      });
      
   }

   AddLink = (e) =>{
    
    e.preventDefault();
    var docValue=this.props.location.state.prowalk;
    console.log(docValue)
    var additionLink =this.state.link;
     var db = fire.firestore();
     var usersRef = db.collection('login').doc(docValue);
     usersRef.update({
       link:additionLink
     }).then(()=>{
      fire.firestore()
  .collection('login')
  .doc(docValue)
  .get()
  .then(documentSnapshot => {
    console.log('User exists: ', documentSnapshot.exists);

    if (documentSnapshot.exists) {
     var nameValue= documentSnapshot.data().name;
     var realtime = fire.database();
     console.log('this is'+nameValue);
     realtime.ref('users/'+nameValue+'/').update({
      Instalink:additionLink
     })
    }
  }).then(()=>{
    alert("Link Has Been Send Successfully");
    this.setState({
      link:''
    })
  });
     })

   }
 DashboardPage=()=>{
  var docValue=this.props.location.state.prowalk;
  this.props.history.push({pathname: '/profiledash',
       state:{docValue}})
 }

 EditProfilePage=()=>{
  var docValue=this.props.location.state.prowalk;
   this.props.history.push({pathname:'/editprofile',
  state:{docValue}})

 }
    

render(){ 
    return(
     
    <div class="col-sm">
      
        <div className="profile-page">
          
          <nav className="navbar  navbar-dark  bg-dark navbar-right"  style={{borderRadius: 0 + 'px'}}>
      <nav className="nav nav-pills nav-fill ">
  <button className="nav-item nav-link active">Home</button>
  <button className="nav-item nav-link" onClick={this.DashboardPage}>DashBoard</button>
  <button className="nav-item nav-link" onClick={this.DashboardPage}>Pricing</button>
  <button className="nav-item nav-link" onClick={this.EditProfilePage}>ViewProfile</button>
  <button type="button" class="btn btn-danger" onClick={this.handlesignout}>Logout </button>

</nav>
      </nav>
      
      <div classname='background-box'>
      
     
        <div className="box1">
         
         <form onSubmit={this.AddLink}>
        <input type="url" name="link" placeholder="  Enter Your InstaLink" id="inputText" onChange={this.updateInput} value={this.state.link} required></input><br></br>
        <button className="url-button">Submit</button>
        </form>
        </div>
         <blockquote>...</blockquote>
         </div> <div className="box2"></div>
        </div> 
    </div>  
    )
}

}

export default Profile;