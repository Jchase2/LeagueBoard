import './App.css';
import SidebarWithHeader from "./components/Heading/Heading";
import RegisterUser from './domain/Register/RegisterUser';
import VerificationComponent from "./domain/Register/VerificationComponent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <SidebarWithHeader children />
          </Route>
          <Route exact path="/signin">
            <RegisterUser />
          </Route>
          <Route exact path="/verify">
            <VerificationComponent />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
