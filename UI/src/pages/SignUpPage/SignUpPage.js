import React, { useState } from "react";
import { useReducer } from "react";
import { formReducer, initialState } from "./SignUpReducer";
import LoadingSpinner from "../../components/LoadingSpinner";

const SignUpPage = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const [apiProgress, setApiProgress] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault();
      const body = {
        userName: state.userName,
        email: state.email,
        password: state.password
      }
      setApiProgress(prevState => true);
      fetch("/api/1.0/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(() => {
        setSignUpSuccess(prevState => true);
      })
      .catch((e) => {
        setSignUpSuccess(prevState => false);
      });
    };
  
    const handleTextChange = (e) => {
      dispatch({
        type: "Handle Input Text",
        field: e.target.name,
        payload: e.target.value,
      });
    }
  
    return (
      <div>
        {!signUpSuccess && 
      <form data-testid="form-sign-up">
        <h1>Sign Up</h1>
        <div className="flex space-x-3 mt-1">
        <label className="label" htmlFor="username">Username</label>
        <input className="input" type="text" name="userName" placeholder="User Name" value={state.userName} onChange={handleTextChange} id="username"/>
        <label className="label" htmlFor="email">E-mail</label>
        <input className="input" type="text" placeholder="Email" name="email" value={state.email} onChange={handleTextChange} id="email"/>
        <label className="label" htmlFor="password">Password</label>
        <input className="input" name="password" placeholder="Password" value={state.password} onChange={handleTextChange} type="password" id="password"/>
        <label className="label" htmlFor="repeatedPassword">Repeat Password</label>
        <input className="input" placeholder="Repeat Password" name="repeatedPassword" value={state.repeatedPassword} onChange={handleTextChange} type="password" id="repeatedPassword"/>
        {apiProgress && <button className="btn-primary" data-testid="button" onClick={handleSubmit} disabled={state.buttonDisabled || apiProgress}><LoadingSpinner/>Sign Up</button>}
        {!apiProgress && <button className="btn-primary" data-testid="button" onClick={handleSubmit} disabled={state.buttonDisabled}>Sign Up</button>}
        </div>
        </form>
}
        { signUpSuccess &&
          <p className="p-3 inline-block mt-5 rounded-lg bg-green-200 text-green-700">
          Please check your email to activate your account
          </p>}
      </div>
    )
  };
  


export default SignUpPage;