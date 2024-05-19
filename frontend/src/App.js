import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PropertyForm from './components/Property/PropertyForm';
import PropertyList from './components/Property/PropertyList';

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/post-property" component={PropertyForm} />
        <Route path="/" component={PropertyList} />
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
