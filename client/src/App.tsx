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
import { ScrimLayout } from "./domain/Dashboard/Scrimmage/ScrimLayout";
import SidebarWithHeader from "./components/Heading/Heading";
import Layout from "./domain/Profile/Layout";


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <SidebarWithHeader>
              <Layout />
            </SidebarWithHeader>
          </Route>
          <Route exact path="/Home">
            <SidebarWithHeader>
              <Layout />
            </SidebarWithHeader>
          </Route>
          <Route exact path="/topics">
            <SidebarWithHeader>
              <Topics />
            </SidebarWithHeader>
          </Route>
          <Route exact path="/topics/create">
            <SidebarWithHeader>
              <CreateTopic />
            </SidebarWithHeader>
          </Route>
          <Route exact path="/topic/:id">
            <SidebarWithHeader>
              <ThreadPage />
            </SidebarWithHeader>
          </Route>
          <Route exact path="/signup" component={RegisterUser}></Route>
          <Route exact path="/signin" component={Login}></Route>
          <Route exact path="/verify" component={VerificationComponent}></Route>
          <Route exact path="/topics" component={Topics}></Route>
          <Route exact path="/topics/create" component={CreateTopic}></Route>
          <Route exact path="/topics/:id" component={ThreadPage}></Route>
          <Route exact path="/scrim" component={ScrimLayout}></Route>

        </Switch>
      </Router>
      
    </>
  );
}

export default App;
