import { useReducer, useEffect } from "react";
import { formReducer, initialState } from "./SignUpReducer";

export const useSignUp = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const url = "/api/1.0/users";

    const handleSubmit = (event) => {
      event.preventDefault();
      const body = {
        userName: state.userName,
        email: state.email,
        password: state.password
      }
      //axios.post("/api/1.0/users", body);
      fetch("/api/1.0/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      dispatch({type: "Empty values"});
    };

    useEffect(() => {
      const controller = new AbortController();
      const body = {
        userName: state.userName,
        email: state.email,
        password: state.password
      }

      fetch("/api/1.0/users", { signal: controller.signal }, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      return () => {
        controller.abort();
      }
    }, [url])
  
    const handleTextChange = (e) => {
      dispatch({
        type: "Handle Input Text",
        field: e.target.name,
        payload: e.target.value,
      });
    }

    return {
      handleSubmit,
      handleTextChange,
      state
    };
};