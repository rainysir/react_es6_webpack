import React from 'react';
import './style.scss';
import ReactDom, {render} from 'react-dom';
import { Router, Route} from 'react-router';
import { HashRouter } from 'react-router-dom';
import {Layout1} from '../../components/layout';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class Routers extends React.Component {
  render() {
    return (
      <HashRouter history={history}>
        <div>
          <Route path="/" component={Layout1}>
          </Route>
          <Route path="/object" component={require('react-proxy-loader!./object/comment')}>
          </Route>
          <Route path="/label" component={require('react-proxy-loader!./label/label')}>
          </Route>
          <Route path="/review" component={require('react-proxy-loader!./review/review')}>
          </Route>
          <Route path="/result" component={require('react-proxy-loader!./result/result')}>
          </Route>
          <Route path="/reply" component={require('react-proxy-loader!./reply/reply')}>
          </Route>
          <Route path="/shared" component={require('react-proxy-loader!./shared/shared')}/>
          <Route path="/suggestion" component={require('react-proxy-loader!./suggestion/suggestion')}/>
        </div>
      </HashRouter>
    )
  }
}
render(
  <Routers/>,
  document.getElementById('application')
)
