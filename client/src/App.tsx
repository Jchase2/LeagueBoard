import RegisterUser from "./domain/Register/RegisterUser";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./domain/Login/Login";
import index from "./pages";
import VerificationComponent from "./domain/Register/VerificationComponent";
import Topics from './domain/Forums/Topics';
import CreateTopic from './domain/Forums/CreateTopic';
import ThreadPage from './domain/Forums/ThreadPage';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={index}></Route>
          <Route exact path="/signup" component={RegisterUser}></Route>
          <Route exact path="/signin" component={Login}></Route>
          <Route exact path="/verify" component={VerificationComponent}></Route>
          <Route exact path="/topics" component={Topics}></Route>
          <Route exact path="/topics/create" component={CreateTopic}></Route>
          <Route exact path="/topics/:id" component={ThreadPage}></Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
