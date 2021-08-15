import './App.css';
import SidebarWithHeader from "./components/Heading/Heading";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
    <SidebarWithHeader children />
      <Router>
        <Switch>
          <Route path="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
