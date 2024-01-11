import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useState } from "react";
import "./sign-in-form.styles.scss";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";

const signInFields = {
  email: "",
  password: "",
};

const SigInForm = () => {
  const [formFields, setFormFields] = useState(signInFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const resetFormFields = () => {
    setFormFields(signInFields);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(user);
      resetFormFields();
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case "auth/invalid-credential":
          alert("Email or password is incorrect.");
          break;
        default:
          console.log("Error logging you in.");
      }
    }
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    console.log(user);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSignIn}>
        <FormInput
          label="Email"
          required
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
        />
        <FormInput
          label="Password"
          required
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
        />
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
     
    </div>
  );
};
export default SigInForm;
