import './App.css';
import Champions from "./components/Champions/Champions"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Champions} />
      </Switch>
    </Router>
  );
}

export default App;
