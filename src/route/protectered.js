import {Route,Redirect } from 'react-router';

 const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return isAuthenticated ? <Comp {...props} /> : <Redirect to="/profile" />;
        }}
      />
    );
  };
  
  export default ProtectedRoute;