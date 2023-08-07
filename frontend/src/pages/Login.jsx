import React ,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendURLs } from '../utitlity/backendURLs';
import { useContext } from "react";
import { AuthContext } from '../context/authContext';

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate('/');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="auth">
        <h1>Login</h1>
        <form>
            <input required type='email' placeholder='email' name='email' onChange={handleChange}/>
            <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Login</button>
            { err && <p>{err}</p>}
            <span>Don't Have an account? <Link to="/register">Register</Link></span>
        </form>
    </div>
  )
}

export default Login