import RegisterUser from "./domain/Register/RegisterUser";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./domain/Login/Login";
import VerificationComponent from "./domain/Register/VerificationComponent";
import Topics from './domain/Forums/Topics';
import CreateTopic from './domain/Forums/CreateTopic';
import ThreadPage from './domain/Forums/ThreadPage';
import SidebarWithHeader from "./components/Heading/Heading";
import Layout from "./domain/Profile/Layout";


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/signup" component={RegisterUser}></Route>
          <Route exact path="/signin" component={Login}></Route>
          <Route exact path="/verify" component={VerificationComponent}></Route>
        </Switch>
        <Router>
          <Switch>
            <SidebarWithHeader>
              <Route exact path="/" component={Layout}></Route>
              <Route exact path="/Home" component={Layout}></Route>
              <Route exact path="/topics" component={Topics}></Route>
              <Route
                exact
                path="/topics/create"
                component={CreateTopic}
              ></Route>
              <Route exact path="/topic/:id" component={ThreadPage}></Route>
            </SidebarWithHeader>
          </Switch>
        </Router>
      </Router>
    </>
  );
}

export default App;
