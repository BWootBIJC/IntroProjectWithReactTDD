import React, { useEffect, useMemo } from "react";
import { useReducer } from "react";

const formReducer = (state, action) => {
    console.log(state, "STATE");
    switch(action.type) {
        case "Handle Input Text":
            if (state.password === state.repeatedPassword && state.password !== ""){
                return {
                    ...state,
                    buttonDisabled: !state.buttonDisabled
                }
            }
            return {
                ...state,
                [action.field]: action.payload,
            };
        default: 
            return state;
    }
}

const initialState = {
    userName: "",
    email: "",
    password: "",
    repeatedPassword: "",
    buttonDisabled: true
}


const SignUpPage = () => {
    const [formState, dispatch] = useReducer(formReducer, initialState);

    const handleTextChange = (e) => {
        dispatch({
            type: "Handle Input Text",
            field: e.target.name,
            payload: e.target.value,
        });
    }
    
    const handleSignUp = () => {

    }

    return (
        <>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input type="text" name="userName" value={formState.userName} onChange={handleTextChange} id="username"/>

        <label htmlFor="email">E-mail</label>
        <input type="text" name="email" value={formState.email} onChange={handleTextChange} id="email"/>
        <label htmlFor="password">Password</label>
        <input name="password" value={formState.password} onChange={handleTextChange} type="password" id="password"/>
        <label htmlFor="repeatedPassword">Repeat Password</label>
        <input name="repeatedPassword" value={formState.repeatedPassword} onChange={handleTextChange} type="password" id="repeatedPassword"/>
        <button className="btn-primary" disabled={formState.buttonDisabled}>Sign Up</button>
        </>
    )
};


export default SignUpPage;