import { PayloadAction } from '../actions/iPayloadAction';
import * as types from '../actions/actionTypes';

export interface MessageState
{
    message: string;
}

export default (state: MessageState = { message: '' }, action: PayloadAction) =>
{
    switch (action.type)
    {
        case types.APPEND_TEXT:
            return { ...state, message: state.message + action.payload };
        case types.RESET_TEXT:
            return { ...state, message: '' };
        case types.OVERRIDE_TEXT:
            return { ...state, message: action.payload };
        case types.SET_EXCLAMATION:
            return { ...state, message: state.message + '!' };
        default:
            return state;
    }
};