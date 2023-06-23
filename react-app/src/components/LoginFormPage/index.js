import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';
// import { getPlaces } from "../../store/placesVisited";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  // const placesVisited = useSelector((state) => state.session.placesVisited);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/office-finished" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === 'Demo') {
      return setErrors(['Cannot login to default character. Please use default character button on \'create a character\' page.'])
    }
    const data = await dispatch(login(username, password));
    if (data) {
      setErrors(data);
    }
  };


  return (
    <div className="login-house">
      <img id="starting-logo" src="https://i.imgur.com/n2LDt9A.png?1" alt="case 1124"></img>
      <h2>Continue game...</h2>
      <p><span>Need to start a new game? Create a character </span>
      <span id='continue-game' onClick={() => history.push('/signup')}>here</span></p>
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
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Continue game</button>
      </form>
      <footer>
        <span id='about'>
          Story written by Jenna Godfrey
        </span>
        About the creator:
        <span>
          <a href="https://github.com/jgodfrey324" target="_blank">
            <i className="fa-brands fa-github" style={{color: "#000000"}}></i>
          </a>
        </span>
        <span>
          <a href="https://www.linkedin.com/in/jenna-godfrey-6ba51b107/" target="_blank">
            <i className="fa-brands fa-linkedin-in" style={{color: "#000000"}}></i>
          </a>
        </span>
      </footer>
    </div>
  );
}

export default LoginFormPage;
