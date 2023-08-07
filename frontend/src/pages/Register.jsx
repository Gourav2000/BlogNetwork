import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendURLs } from '../utitlity/backendURLs';
import { MdOutlineClear } from 'react-icons/md'

const Register = () => {

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", inputs.name)
      formData.append("email", inputs.email)
      formData.append("password", inputs.password)
      file && formData.append("image",file)
      await axios.post(BackendURLs.REGISTER_URL, formData);
      navigate('/login');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input required type='text' placeholder='name' onChange={handleChange} name="name" />
        <input required type='email' placeholder='email' onChange={handleChange} name="email" />
        <input required type='password' placeholder='password' onChange={handleChange} name="password" />
        <div className="uploadImageDiv">
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Profile Image
          </label>

          {file && <div className="selectedFileItem">
            <div className="pImage">
              <img src={URL.createObjectURL(file)}></img>
            </div>
            <div className="">
              <label className="file">
                <b>{file.name}</b>
              </label>
              <button className='xButton' onClick={() => { setFile(null) }}><MdOutlineClear /></button>
            </div>
          </div>}
        </div>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Do you Have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register