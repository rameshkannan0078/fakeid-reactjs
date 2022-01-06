import React from 'react';
import './linkadd.css';
import fire from '../config/fire';
import 'bootstrap/dist/css/bootstrap.min.css';



class LinkAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: "",
      addlink: "",
      Linklist:[],
      keyValues:[],
      Members:[],
      AddedList:[],
      name:''
    }
  }



  updateInput = e => {
    this.setState({
      [e.target.name] : e.target.value,
     
    })
  }

  updateData(value) {
    var LinkAdder=this.state.addlink;
    
    var realtime = fire.database();
    realtime.ref('users').orderByChild("name").equalTo(value).once("value").then(function (snapshot) {
      snapshot.forEach(function (child) {
       child.ref.child('links').push({
          link:LinkAdder
        });
        
        var db = fire.firestore();
        var usersRef = db.collection('fakelink');
        usersRef.add({
         link:LinkAdder 
        })


      })
    }).then(function () {
      
      alert('Link Added Successfully');
    });

 
  }   
 
showData(value){
 
  fire.database().ref('users/'+value+'/links').once("value", snapshot => {
    let studentlist = [];
    let keys=[];
    this.setState({name : value});
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

dashboardUpdates(value){

  fire.database().ref('users/'+value+'/').update({
    complete:1
  }).then(()=>{
    
    this.props.history.push('/adminpanel')
  });
}


DeleteLink(value){
   var Username=this.state.name;
   console.log(Username)
  fire.database().ref('users/'+Username+'/links').orderByChild('link').equalTo(value).once("value").then(function (snapshot) {
    snapshot.forEach(function (child) {
     child.ref.remove()
    })
  }).then(function () {

    alert("Deleted Successfully");
  });
}


  render() {
    return (
     
      <div className="mainbox">
      <div className="mainbox-img"></div>
      <div className="mainbox-h1"><p>update me</p></div>
      <div className="mainform">
      <div className="MainDiv">
        <table id="example" className="display table">
          <thead class="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>PhoneNo</th>
              <th>Instagram Link</th>
              <th>Add Links</th>
            </tr>
          </thead>
          <tbody>

            {this.props.location.state.studentlist.map(data => {

              return (
                <tr>

                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phoneno}</td>
                  <td>{data.Instalink}</td>
                  <td>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" name="addlink" placeholder="Recipient's Link" aria-label="Recipient's username" aria-describedby="basic-addon2"  onChange={this.updateInput} value={this.state.addlink}/>
                      <div class="input-group-append">
                        <button className="add-link" onClick={() => this.updateData(data.name)}>Add the Links</button><br></br><br></br>
                        <button type="button" class="btn btn-warning" onClick={()  => this.showData(data.name)}>Show More</button><br></br><br></br>
                        <button type="button" class="btn btn-primary" onClick={() => this.dashboardUpdates(data.name)}>Completed</button>
                      </div>
                    </div>
                  </td>
                  
                </tr>
                
              );

            })}
             </tbody>
        </table>

             {this.state.Linklist.map((data) => {
                
                return (
                 
                  <div className="listul">  
        
                    <ul><li>{data.link}</li>
                    <div><table>
                     <tr> <button type="button" class="btn-btn-warning" onClick={() => this.DeleteLink(data.link)}>Delete</button></tr>
                     </table></div></ul>
                  </div>
                );
               
                })}
        


         
       </div>
      </div>
      </div>
    );
  }
}
export default LinkAdd;