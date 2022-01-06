
import { Component } from "react";
import fire from "../config/fire";
import './editprofile.css';






class EditProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            Linklist:[],
        }
    }

    componentDidMount(){
        var value=fire.auth().currentUser.email;
        console.log(value);
        var db=fire.firestore();
        db.collection("login").doc(value)

        .get().then((doc) => {
            var city=[]
          if (doc.exists){
            // Convert to City object
             city.push(doc.data());
            this.setState({
              Linklist:city
            })
         }
        })


           // Use a City instance method
        
    }



    render(){
        return(
          <div className="editprofile-page">
           
           <div className="editprofile-box">
           <h1>Profile</h1>
<table id="example" class="display table">

<tbody>
{this.state.Linklist.map(data => {

return (
  <div className="tdplace">
  <div className="tdplace-text"> 
  <tr>Name</tr>
  <td>{data.name}</td>
  <tr>Email Id  </tr>
  <td>{data.email}</td>

  
  <tr>Mobile Number</tr>
  <td>{data.phoneno}</td>
 
  <tr>Instagram Link</tr>
  <td> {data.link}</td>
  </div>
  
  </div>
  
);

})}
</tbody>
</table>
</div>
 
   
   <div className="lamp">
   
 
   </div>
  </div>
 

        );
    }


}
export default EditProfile;