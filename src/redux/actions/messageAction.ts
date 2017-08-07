import { PayloadAction } from './iPayloadAction';
import { Action } from 'redux';
import * as types from './actionTypes';

export function AppendStr(strToAppend: string): PayloadAction
{
    return {
        type: types.APPEND_TEXT,
        payload: strToAppend
    };
}

export function DeleteMsg(): Action
{
    return {
        type: types.RESET_TEXT
    };
}

export function AddExclamationMark(): Action
{
    return {
        type: types.SET_EXCLAMATION
    };
}

export function OverrideText(newMsg: string): PayloadAction
{
    return {
        type: types.OVERRIDE_TEXT,
        payload: newMsg
    };
}