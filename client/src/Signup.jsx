import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log('STATUS', response.status);
      if (response.status == '409') {
        setMessage('Username already exists');
        throw new Error('response failed');
      } else if (response.status == '400') {
        setMessage('You must include a username and password');
        throw new Error('response failed');
      }
      const data = await response.json();
      console.log(data);
      setUsername('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id='signup'>
      <h1 id='signup-title'>Sign Up</h1>
      <form
        id='signup-form'
        onSubmit={handlerSubmit}
      >
        <input
          id='signup-username'
          type='text'
          placeholder='Username...'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id='signup-password'
          type='password'
          placeholder='Password...'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div id='signup-error'>{message}</div>
        <button
          type='submit'
          id='signup-submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
