import React from 'react';
import ReactDom, {render} from 'react-dom';
import { Router, Route} from 'react-router';
import { HashRouter } from 'react-router-dom';
import 'antd/dist/antd.css'
import {Layout1} from '../../components/layout';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory()

class Routers extends React.Component {
  render() {
    return (
      <HashRouter history={history}>
        <div>
          <Route path="/" component={Layout1}>
          </Route>
          <Route path="/sample" component={require('react-proxy-loader!./Sample')}>
          </Route>
          <Route path="/accountList" component={require('react-proxy-loader!../sub_account/account_form')}>
          </Route>
          <Route path="/test" component={require('react-proxy-loader!../sub_account/test')}>
          </Route>
          <Route path="/Permission/:id/:name" component={require('react-proxy-loader!../sub_account/Permission')}>
          </Route>
        </div>
      </HashRouter>
    )
  }
}
render(
  <Routers/>,
  document.getElementById('application')
)
