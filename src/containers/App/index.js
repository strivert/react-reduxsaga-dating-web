import React, { Component } from "react";
import Authorize from '../../HOC/Authorize';
import Footer from '../../components/Footer/';
import Main from '../../components/Main/';
import NavBar from '../../containers/NavBar/';

import 'normalize.css/normalize.css';
import 'react-select/dist/react-select.css';
import '../../static/fonts/css/font-awesome.min.css';
import '../../static/fonts/themify-icons/themify-icons.css';
import '../../static/styles/main.css';

class App extends Component {
  render() {
    const { authenticated, auth, location} = this.props;

    if (this.props.location.pathname.indexOf('/onboarding') === 0) {
      return (
        <div className="app">
          <Main />
        </div>
      )
    }

    return (
      <div className="app">
        <NavBar authenticated={authenticated} currentUser={auth.currentUser} location={location} />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default Authorize(App);
