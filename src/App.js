import logo from './logo.svg';
import store from './store';
import MainPage from './Component/script/mainPage';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter} from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={MainPage}></Route>
      </Router>
    </Provider>
    
  );
}

export default App;
