import * as React from 'react';
import { connect } from 'react-redux';

export interface IMessage
{
    message: string;
}

export class Message extends React.Component<any, any>
{
    constructor(props: IMessage)
    {
        super(props);
    }

    render()
    {
        return (
            <div>
                <p>{this.props.message}</p>
            </div>
        );
    }
}