import React from 'react';
import fire from '../config/fire';
import './dashboard.css';
class DashBoard extends React.Component{


    constructor(props) {
    
        super(props);
       
        this.state = {studentslist : []}
        }

    componentDidMount() {
   
   
     
        fire.database().ref("users/"+this.props.location.state.panda+'/').orderByChild('complete').equalTo(1).on("value", snapshot => {
          let studentlist = [];
          snapshot.forEach(snap => {
              studentlist.push(snap.val());
          });
          this.setState({ studentslist: studentlist });
        });
      
      
   }


    render(){
        return(
        <div className="dbody">
          <div className="dc-box">
               <h1>Datas Completed List</h1>
          </div>
          <div className="dc-table">
               <table id="example" class="display-table">
            <thead class="thead-dark">
            <tr>
                    <th >Name</th>
                    <th>Email</th>
                    <th>PhoneNo</th>
                </tr>
                </thead>
                <tbody>
            {this.state.studentslist.map(data => {
                
                return (
                    <tr> 
                      
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.phoneno}</td>
                    </tr>
                    
                );
               
                })}
                </tbody>
                </table>

          </div>
         </div>
            );
           
    }

}
export default DashBoard;