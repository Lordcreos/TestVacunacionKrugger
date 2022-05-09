import React, { useContext } from 'react';
import Login from 'pages/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from 'pages/Register';
import Users from 'pages/Users';
import UserProfile from 'pages/UserProfile';
import { AuthContext } from 'components/context/authContext';
import Tasks from 'pages/Tasks';
import Task from 'pages/Task';

function App() {
  const { user, userLoading } = useContext(AuthContext);
  if(userLoading){
    return null;
  }
  return (
    <Switch>
      {!user ? (
        <>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={()=><Redirect to="/login" />} />
        </>
      ) : (
        <>
          <Route exact path="/" component={Tasks} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={UserProfile} />
          <Route exact path="/task/:id" component={Task} />
        </>
      )}
    </Switch>
  );
}

export default App;
