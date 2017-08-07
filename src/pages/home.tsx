import { AddExclamationMark, AppendStr } from '../redux/actions/messageAction';
import * as React from 'react';
import { connect } from 'react-redux';
import { Message } from '../components/message';
import { fetchState } from 'react-router-server';
import { Helmet } from 'react-helmet';

interface IMessageState
{
    value: string;
}

@connect(store =>
{
    return {
        msg: store.msg.message
    };
})
export default class Home extends React.Component<any, any>
{
    constructor(props)
    {
        super(props);
        this.state = {value: ''};

        this.addExclamationToMsg = this.addExclamationToMsg.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.appendMsgText = this.appendMsgText.bind(this);
    }

    handleChange(event)
    {
        this.setState({value: event.target.value});
    }

    addExclamationToMsg()
    {
        this.props.dispatch(AddExclamationMark());
    }

    appendMsgText(event)
    {
        this.props.dispatch(AppendStr(this.state.value));
        event.preventDefault();
    }

    render()
    {
        return (
            <div>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <Message message={this.props.msg} />
                <form onSubmit={this.appendMsgText}>
                    <label>
                        Winner:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={this.addExclamationToMsg}>Add Exclamation</button>
            </div>
        );
    }
}