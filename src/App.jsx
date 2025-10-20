import { Switch, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/main">
        <h1>Main</h1>
      </Route>
      <Route exact path="/error">
        <h1>Error</h1>
      </Route>
    </Switch>

  );
}

export default App;
