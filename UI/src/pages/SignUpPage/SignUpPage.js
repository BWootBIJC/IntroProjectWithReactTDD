import React from "react";
import { useReducer } from "react";
import { formReducer, initialState } from "./SignUpReducer";
import axios from "axios";

const SignUpPage = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleSubmit = (event) => {
      event.preventDefault();
      const body = {
        userName: state.userName,
        email: state.email,
        password: state.password
      }
      axios.post("/api/1.0/users", body);
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
      <form>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input type="text" name="userName" value={state.userName} onChange={handleTextChange} id="username"/>
        <label htmlFor="email">E-mail</label>
        <input type="text" name="email" value={state.email} onChange={handleTextChange} id="email"/>
        <label htmlFor="password">Password</label>
        <input name="password" value={state.password} onChange={handleTextChange} type="password" id="password"/>
        <label htmlFor="repeatedPassword">Repeat Password</label>
        <input name="repeatedPassword" value={state.repeatedPassword} onChange={handleTextChange} type="password" id="repeatedPassword"/>
        <button className="btn-primary" onClick={handleSubmit} disabled={state.buttonDisabled}>Sign Up</button>
        </form>
      </div>
    )
  };
  


export default SignUpPage;