import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

class AppRouter extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={`${url}/`}
          component={asyncComponent(() => import('../DashRoot/index.js'))}
        />

        <Route
          exact
          path={`${url}/order`}
          component={asyncComponent(() => import('../Order'))}
        />
        <Route
          exact
          path={`${url}/order-history`}
          component={asyncComponent(() => import('../OrderHistory'))}
        />
        <Route
          exact
          path={`${url}/settings`}
          component={asyncComponent(() => import('../Settings'))}
        />

        <Route
          exact
          path={`${url}/invoice`}
          component={asyncComponent(() => import('../Page/invoice/invoice'))}
        />
        <Route
          exact
          path={`${url}/invoice-text`}
          component={asyncComponent(() => import('../Page/invoice/invoice-text'))}
        />

      </Switch>
    );
  }
}

export default AppRouter;
