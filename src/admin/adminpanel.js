import React from 'react';
import './adminpanel.css';
import fire from '../config/fire';
import 'bootstrap/dist/css/bootstrap.min.css';

//Calling Firebase config setting to call the data




class AdminPanel extends React.Component {
constructor(props) {
    
    super(props);
   
    this.state = {studentslist : [],
    search:"",
  SelectedValue:"",
passValue:''}
    }
    
    updateInput = e => {
      this.setState({
        [e.target.name] : e.target.value,
       
      })
    }
  componentDidMount() {
   
   
     
      fire.database().ref("users").on("value", snapshot => {
        let studentlist = [];
        snapshot.forEach(snap => {
            // snap.val() is the dictionary with all your keys/values from the 'students-list' path
            studentlist.push(snap.val());
        });
        this.setState({ studentslist: studentlist });
      });
    
    
 }
 handleText= (e) =>{
   e.preventDefault();
   fire.database().ref("users").orderByChild("name").startAfter(this.state.search).on("value", snapshot => {
    let studentlist = [];
    snapshot.forEach(snap => {
        // snap.val() is the dictionary with all your keys/values from the 'students-list' path
        studentlist.push(snap.val());
    });
    this.setState({ studentslist: studentlist });
  });

 }
  
 updateLinks=(e)=>{
   console.log(this.state.SelectedValue);
  

 }
   
   openData(value) {
    this.setState({passValue:value})
    fire.database().ref("users").orderByChild("name").equalTo(value).on("value", snapshot => {
      let studentlist = [];
      snapshot.forEach(snap => {
          studentlist.push(snap.val());
      });
      this.setState({ studentslist: studentlist });
      this.props.history.push({pathname: "/linkadd",
      state: { studentlist}})
   
    });
  }


  DashboardPage = (e) =>{
    e.preventDefault();
    var panda= this.state.passValue;
    this.props.history.push({pathname: "/dashboard",
    state: { panda}})

  }



  render(){
  return (
    <div className="adminpanel">
      <nav className="navbar navbar-dark bg-dark navbar-right "  style={{borderRadius: 0 + 'px'}} >
      <nav className="nav nav-pills nav-fill ">
  <a class="nav-item nav-link active" href="/#">Home</a>
  <button class="nav-item nav-link" onClick={this.DashboardPage}>DashBoard</button>
</nav>
      </nav>
      <div className="adminimg">
      <div className="input-group_mb-3">
                <form class="form-inline" onSubmit={this.handleText}>
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"  name="search" onChange={this.updateInput} value={this.state.search}/><br/>
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="submit">Search</button>
  </div>
  </form>
</div>
        <div className="admingirl">
        </div>
          <div className="admintable">
          <table id="example" className="display-table" >
            <thead class="thead-dark">
               
                <tr>
                    <th >Name</th>
                    <th>Email</th>
                    <th>PhoneNo</th>
                    <th>FakeIds</th>
                </tr>
            </thead>
            <tbody>
            {this.state.studentslist.map(data => {
                
                return (
                    <tr> 
                      
                    <td className="">{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.phoneno}</td>
                    <td><button onClick={()=>this.openData(data.name)}>Update Me</button>
                    </td>
                    </tr>
                    
                );
               
                })}
        
               
            </tbody>
            
         </table>
        </div>
     </div>
     </div>
  );
}
}
export default AdminPanel;