import React, { useEffect } from "react";
import { useReducer } from "react";
import { formReducer, initialState } from "./SignUpReducer";

const SignUpPage = () => {
    
  
    return (
      <div>
      <form>
        <h1>Sign Up</h1>
        <label className="label" htmlFor="username">Username</label>
        <input className="input mx-3" type="text" name="userName" placeholder="User Name" value={state.userName} onChange={handleTextChange} id="username"/>
        <label className="label" htmlFor="email">E-mail</label>
        <input className="input mx-3" type="text" placeholder="Email" name="email" value={state.email} onChange={handleTextChange} id="email"/>
        <label className="label" htmlFor="password">Password</label>
        <input className="input mx-3" name="password" placeholder="Password" value={state.password} onChange={handleTextChange} type="password" id="password"/>
        <label className="label" htmlFor="repeatedPassword">Repeat Password</label>
        <input className="input mx-3" placeholder="Repeat Password" name="repeatedPassword" value={state.repeatedPassword} onChange={handleTextChange} type="password" id="repeatedPassword"/>
        <button className="btn-primary" onClick={handleSubmit} disabled={state.buttonDisabled}>Sign Up</button>
        </form>
      </div>
    )
  };
  


export default SignUpPage;