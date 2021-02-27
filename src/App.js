import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from '@/containers/Layout';
import Foobar from '@/containers/Foobar';

export const App = withRouter(() => {
  return (
    <Switch>
      <Layout>
        <Route exact path="/" component={Foobar} />
      </Layout>
    </Switch>
  );
});
