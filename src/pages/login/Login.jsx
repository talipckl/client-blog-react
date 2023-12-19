import React, { useState } from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    await fetch(process.env.REACT_APP_API_URL+'/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      return response.json();
    }).then(response => {
        localStorage.setItem('token', response.data.access_token);
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
      setLoggedIn(true);
  };
   if (isLoggedIn) {
          return <Redirect to="/" />;
   }

  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>
          <form >
            <span>Username or email address *</span>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <span>Password *</span>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className='button' onClick={handleLogin} >Log in</button>
          </form>
        </div>
      </section>
    </>
  )
}
