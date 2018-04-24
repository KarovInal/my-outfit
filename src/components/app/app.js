import React, { Component } from 'react';
import store from 'Store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import UploadPage from 'Pages/upload-page';

import Header from 'Layouts/header';
import Layout from 'Layouts/layout';

import { UPLOAD_PAGE } from 'Constants/routes';

import 'antd/dist/antd.css';
import './main.css';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div>
            <Header />
            <Layout>
              <Route exact path="/" component={ UploadPage } />
              <Route exact path={ UPLOAD_PAGE } component={ UploadPage } />
            </Layout>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
