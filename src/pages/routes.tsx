import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
const ExecutionEnvironment = require('exenv');

import Home from './home';
import NotFound from './notfound';

@connect()
export default class Routes extends React.Component<any, any>
{
    render()
    {
        return (
           <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}