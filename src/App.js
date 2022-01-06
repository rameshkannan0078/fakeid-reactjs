import { Component} from "react";
import Login from './login/login';
import Profile from './profile/profile';
import home from './home/home';
import admin from './admin/admin';
import AdminPanel from './admin/adminpanel';
import ProfileDash from "./profile/profiledash";
import LinkAdd from './admin/linkadd';
import DashBoard  from "./admin/dashboard";
import ProtectedRoute from './route/protectered';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import forget from './forget/forget';
import "./App.css";
import EditProfile from "./profile/editprofile";



class  App extends Component{


render(){
  return(
    <Router>
      
          <Switch>
              <Route   exact path='/' component={home}/>
              <Route   exact path='/login' component={Login} />
              <ProtectedRoute path="/profile"  component={Profile} />
              <Route   exact path='/forget' component={forget} />
              <Route   exact  path='/admin' component={admin} />
              <Route   exact  path='/adminpanel' component={AdminPanel} />
              <Route   exact  path='/linkadd' component={LinkAdd} />
              <Route   exact  path='/dashboard' component={DashBoard} />
              <Route   exact  path='/profiledash' component={ProfileDash} />
              <Route   exact  path='/editprofile' component={EditProfile} />



          </Switch>
  </Router>
  );
} 
 
}

export default App;