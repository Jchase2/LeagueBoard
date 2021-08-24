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
import LayoutS from "./domain/Search/LayoutS";
import ListScrimmages from "./domain/Scrimmages/ListScrimmages";
import CreateScrimmage from './domain/Scrimmages/CreateScrimmage'
import ScrimLayout from "./domain/Dashboard/Scrimmage/ScrimLayout";


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
          <Route exact path="/scrims">
            <SidebarWithHeader>
              <ListScrimmages/>
            </SidebarWithHeader>
          </Route>
          <Route exact path="/scimmage/:id">
            <SidebarWithHeader>
              <ScrimLayout/>
            </SidebarWithHeader>
          </Route>
          <Route exact path="/scrims/create">
            <SidebarWithHeader>
              <CreateScrimmage />
            </SidebarWithHeader>
          </Route>
          <Route exact path="/view/:id">
            <SidebarWithHeader>
              <LayoutS />
            </SidebarWithHeader>
          </Route>
          <Route exact path="/signup" component={RegisterUser}></Route>
          <Route exact path="/signin" component={Login}></Route>
          <Route exact path="/verify" component={VerificationComponent}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
