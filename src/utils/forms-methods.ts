import {batch} from 'react-redux';
import React from 'react';
import {AnyAction, Dispatch} from 'redux';

export function handleInputWithRedux(e: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch<AnyAction>, setInputValueReducer: any, setInputErrorMessageReducer: any) {
    batch(() => {
        dispatch(setInputValueReducer(e.target.value));
        dispatch(setInputErrorMessageReducer(e.target.validationMessage));
    });
}