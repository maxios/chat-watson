import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from '@/containers/Layout';
import Chat from '@/containers/Chat';

export const App = withRouter(() => {
  return (
    <Switch>
      <Layout>
        <Route exact path="/" component={Chat} />
      </Layout>
    </Switch>
  );
});
