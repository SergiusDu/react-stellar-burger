import {batch} from "react-redux";

export function handleEmailChange(e, setInputEmail) {
    setInputEmail(e.target.value);
}

export function handleInputWithRedux(e, dispatch, setInputValueReducer, setInputErrorMessageReducer) {
    batch(() => {
        dispatch(setInputValueReducer(e.target.value));
        dispatch(setInputErrorMessageReducer(e.target.validationMessage));
    })
}