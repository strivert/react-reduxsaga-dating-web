import React from 'react';

import Button from '../Button';

const NotFoundPage = ({ history }) =>
  <div className="notfoundpage">
    Not found page! <Button className="notfoundpage__button" onClick={() => history.push('/')}> Go Back! </Button> 
  </div>

export default NotFoundPage;