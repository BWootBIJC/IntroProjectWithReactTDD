export const initialState = {    
    userName: "",
    email: "",
    password: "",
    repeatedPassword: "",
    buttonDisabled: true,
  }
  
  export const formReducer = (state, action) => {
    switch(action.type) {
      case "Handle Input Text":
        const { buttonDisabled, ...fieldsState } = state;
      
        // update the field
        const form = {
          ...fieldsState,
          [action.field]: action.payload,
        };
        
        // compute disabled with new values of fields
        const disabled =
          !Object.values(form).every(Boolean) // are all values filled
          || form.password !== form.repeatedPassword; // are the password identical
        
        return {
          ...form,
          buttonDisabled: disabled
        };
        case "Empty values":
          return {
            userName: "",
            email: "",
            password: "",
            repeatedPassword: "",
            buttonDisabled: true
          }
      default: 
        return state;
    }
  }