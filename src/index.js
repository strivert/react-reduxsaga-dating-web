import jwtDecode from 'jwt-decode';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import renderRoutes from './routes';
import configureStore from './store';
import { AUTH_USER } from './actions/types';
import Cookies from 'universal-cookie'

// import registerServiceWorker from './registerServiceWorker';

const initialState = {};
const history = createBrowserHistory()
const store = configureStore(initialState, history);
const cookies = new Cookies();

const token = cookies.get('token')

if (token) {
  const valid = jwtDecode(token).exp > (new Date()).getTime()/1000;
  // Update application state. User has token and is probably authenticated
  valid && store.dispatch({type: AUTH_USER, token});
}

render(
  renderRoutes(store, history), 
  document.getElementById('root')
);

// registerServiceWorker();
