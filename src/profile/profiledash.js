import { Component } from "react";
import fire from "../config/fire";
import './dash.css';
class ProfileDash extends Component{
    constructor(props){
        super(props);
        this.state={
            Linklist:[],
            goodvalue:""
        }
    }

    componentDidMount(){

      fire.auth().onAuthStateChanged((user)=>{
        if (user){
          console.log("this is " + user.email);
          var db=fire.firestore();
        db.collection("login").doc(user.email)
        
        .get().then((doc) => {
          if (doc.exists){
            // Convert to City object
            var city = doc.data().name;
            console.log(city)
            fire.database().ref('users/'+city+'/links').once("value", snapshot => {
                let studentlist = [];
                let keys=[];
                snapshot.forEach(snap => {
                    // snap.val() is the dictionary with all your keys/values from the 'students-list' path
                    keys.push(snap.val().child);
                    studentlist.push(snap.val());
                    console.log(snap.val())
                });
                this.setState({ Linklist: studentlist});
              }).then((error)=>{
                console.log(error)
              });
                 
          }
        })
          this.setState({
            goodvalue : user.email
          });
        }
      })


            // Use a City instance method
        
    }

    render(){
        return(

<div className="dashbg">
<div className="sidebox">
  <div className="form-head"><h1>FAKE ID's FOUNDED LIST</h1></div>
  <div className="previewimg"></div>
</div>
<div className="tbody">
<table id="example" class="display table" >

<thead class="thead-dark">
</thead>

{this.state.Linklist.map(data => {

return (
 <ul>
   <li><a href={data.link}>{data.link}</a>
     </li>
   </ul>
  
);

})}

</table>
</div>
</div>
        );
    }
}

export default ProfileDash;