import './App.css';
import SidebarWithHeader from "./components/Heading/Heading";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nothing from './components/nothing/nothing';

function App() {
  return (
    <Router>
      <Nothing />
      <Switch>
        <Route path="/" component={SidebarWithHeader} />
      </Switch>
    </Router>
  );
}

export default App;
