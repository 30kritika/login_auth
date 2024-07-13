import { useState } from 'react';
import './login.css'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleAuth, setGoogleAuth] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Login successful!');
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('/api/google-auth', {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setGoogleAuth(true);
        console.log('Google login successful!');
      } else {
        console.log('Google login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1 className='head'>Login to your <br/>account.</h1>
      <p className="page-body">Please sign in to your account</p>

      <form  onSubmit={handleLogin}>
        <div>
          <label className='input' htmlFor="email">Email Address<br/></label>
          <input className="field" style={{width:"30%", height:"30px"}}
            type="email"
            id="email"
            placeholder='Enter Email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div>
          <label className='input' htmlFor="password">Password<br/></label>
          <input className="field" style={{width:"30%", height:"30px"}}
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <p className='fp'>Forgot password?</p>
        </div>

        <button className="login-btn" 
        style={{width:"26%", height:"35px"}}
        type="submit">Sign In</button>
        <a href="#" 
        onClick={handleGoogleLogin}
        className='btn'>─── Or sign in with Google ───
        </a>
      </form>

      {googleAuth && (
        <p>
          You are logged in with Google!
        </p>
      )}

      <p className='ques'>
        Don't have an account?<a className="reg"href="/register">Register</a>
      </p>
    </div>
  );
}

export default App;