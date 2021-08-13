import './App.css';
import SidebarWithHeader from "./components/Heading/Heading";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      
    </div>
=======
    <Router>
      <Switch>
        <Route path="/" component={SidebarWithHeader} />
      </Switch>
    </Router>
>>>>>>> 8d914d0b4dcd61918c4ccadef948294299f35ab8
  );
}

export default App;
