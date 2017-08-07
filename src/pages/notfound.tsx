import * as React from 'react';
import { connect } from 'react-redux';
@connect()
export default class NotFound extends React.Component<any, any>
{
    render()
    {
        return (
            <div>
                <p>Page not found.</p>
            </div>
        );
    }
}