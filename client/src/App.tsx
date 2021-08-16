import "./App.css";
import SidebarWithHeader from "./components/Heading/Heading";
import RegisterUser from "./domain/Register/RegisterUser";
import VerificationComponent from "./domain/Register/VerificationComponent";
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Champion from "./domain/Dashboard/Champion/Champion";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <SidebarWithHeader children />
            <Champion />
          </Route>
          <Route exact path="/signin" component={RegisterUser}></Route>
          <Route exact path="/verify">
            <VerificationComponent />
          </Route>
          <Route exact path="/scrim">
            <VerificationComponent />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
