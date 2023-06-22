import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp, loginDemo } from "../../store/session";
import './SignupForm.css';
import OpenModalButton from "../OpenModalButton";
import TutorialModal from "../TutorialModal";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, firstName, lastName, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }

  };

  const handleDemo = async () => {
    dispatch(loginDemo())
  }


  return (
    <div className="signup-house">
      <img id="starting-logo" src="https://i.imgur.com/n2LDt9A.png?1" alt="case 1124"></img>
      <h2>Start a new game...</h2>
      <p><span>Need to continue? Continue game </span>
      <span id='continue-game' onClick={() => history.push('/login')}>here</span></p>
      <div id="tutorial-signup">
        <OpenModalButton
        buttonImage='Read the tutorial'
        modalComponent={<TutorialModal />}
        />
      </div>
      <div className="default-char-house">
        <p>Use the default character</p>
        <button onClick={handleDemo}>Use default</button>
      </div>
      <p>or create a new character</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => {
            const string = error.split(' : ')
            if (string.length > 1) {
              return (
                <li style={{listStyle: 'none', color: 'maroon', fontSize: '13px'}}key={idx}>{string[1]}</li>
              )
            } else {
              return (
                <li style={{listStyle: 'none', color: 'maroon', fontSize: '13px'}}key={idx}>{string[0]}</li>
              )
            }
          })}
        </ul>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Start new game</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
