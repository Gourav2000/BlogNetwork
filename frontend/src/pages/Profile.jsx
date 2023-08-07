import React, { useContext } from 'react'
import Avatar from '@atlaskit/avatar';
import { AuthContext } from '../context/authContext'
import { BackendURLs } from "../utitlity/backendURLs";
import { CiEdit } from "react-icons/ci"
import { AiOutlineDelete } from "react-icons/ai"
import Menu from '../components/Menu';
const Profile = () => {
  const { currentUser, logout } = useContext(AuthContext)
  console.log(currentUser)
  return (
    <div className="profilePage">
      <div className="profilePic">
        <img src={`${BackendURLs.GET_IMAGE_BY_IMAGEID}/${currentUser.image}`} />
        <div className="iconRow">
          <button class="icon1">
            <CiEdit size={30} />
          </button>
          <button class="icon2">
            <AiOutlineDelete size={30} />
          </button>
        </div>
      </div>
      <div className="profileData">
        <div className="profileData">
          <h2>Name: {currentUser.name}</h2>
          <p>Email: {currentUser.email}</p>
          {/* Add other user details here */}
          {/* For password change, you can add a button to navigate to a password change page */}
          <button>Change Password</button>
          {/* For the list of posts, you can map through the user's posts and display them */}
          <h3>Posts:</h3>
          <ul>
            <Menu uid={currentUser.uid}/>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile