import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ currentUser, setCurrentUser, setUserId, userId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setMessage('Incorrect username or password');
        throw new Error('login response failed');
      }
      const currentUser = await response.json();
      setCurrentUser(currentUser);
      setUserId(currentUser.id)
      console.log('User that just logged in: ', currentUser);
      setUsername('');
      setPassword('');
      console.log('Redirecting to home page...');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id='login'>
      <h1 id='login-title'>Login</h1>
      <form
        id='login-form'
        onSubmit={handlerSubmit}
      >
        <input
          id='login-username'
          type='text'
          placeholder='Username...'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id='login-password'
          type='password'
          placeholder='Password...'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div id='login-error'>{message}</div>
        <button
          type='submit'
          id='login-submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
