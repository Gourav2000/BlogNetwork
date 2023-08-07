import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import EmojiPicker from 'emoji-picker-react';
import axios from "axios";
import Logo from '../img/logo.png'
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import { BackendURLs } from "../utitlity/backendURLs";
import Avatar from '@atlaskit/avatar';

import Comment, {
  CommentAction,
  CommentAuthor,
  CommentEdited,
  CommentTime,
} from '@atlaskit/comment';



const Single = () => {
  const [post, setPost] = useState({});
  const [commentInput, setCommentInput] = useState("")
  const [comments, setComments] = useState([])
  const [pUser, setPUser] = useState({})
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BackendURLs.GET_POST_BY_ID}/${postId}`);
        const pUser = await axios.get(`${BackendURLs.GET_USER_BY_ID}/${res.data.uid}`)
        const comments = await axios.get(`${BackendURLs.GET_COMMENTS_BY_POST_ID}/${postId}`)
        setPost(res.data);
        setPUser(pUser.data)
        setComments(comments.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  useEffect(()=>{
    console.log("hello")
    setComments(comments)
  },[comments])

  const handleDelete = async () => {
    try {
      await axios.delete(`${BackendURLs.GET_POST_BY_ID / postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`${BackendURLs.GET_IMAGE_BY_IMAGEID}/${post.image}`} alt="" />
        <div className="user">
          {pUser.image && <img
            src={`${BackendURLs.GET_IMAGE_BY_IMAGEID}/${pUser.image}`}
            alt=""
          />}
          <div className="info">
            <span>{pUser.name}</span>
            <p>Posted {post.created_at}</p>
          </div>
          {currentUser.uid === pUser.id && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p>
        <div className="commentWindow">
          {/* <Avatar name="Scott Farquhar" src={Logo} />
            <input
              type="text"
              placeholder="Add a comment"
            /> */}
          <div className="commentInput">
            <form>
              <div className="commentInputAvatar">
                { currentUser.image && <Avatar name="Scott Farquhar" src={`${BackendURLs.GET_IMAGE_BY_IMAGEID}/${currentUser.image}`} />}
              </div>
              <input
                aria-label="Add a comment"
                autoComplete="off"
                type="text"
                name="add-comment"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={({ target }) => setCommentInput(target.value)}
              />
              <button
                type="button"
                disabled={commentInput.length < 1}
                onClick={async()=>{
                  const newComment = await axios.post(`${BackendURLs.ADD_COMMENT}`,{"content": commentInput, "uid": currentUser.uid, "postId": postId})
                  var newCommentData = newComment.data.comment
                  newCommentData["user"]=currentUser
                  console.log(newCommentData)
                  setComments((prevComments)=>[...prevComments,newCommentData])
                  setCommentInput("")
                }}
              >
                Post
              </button>
            </form>
          </div>
          {[...comments].reverse().map((comment) => (
            <div className="comment" key={comment.id}>
              <Comment
                avatar={<Avatar name={comment.user.name} src={`${BackendURLs.GET_IMAGE_BY_IMAGEID}/${comment.user.image}`} />}
                author={<CommentAuthor>{comment.user.name}</CommentAuthor>}
                time={<CommentTime>{comment.created_at}</CommentTime>}
                content={
                  <p>
                    {comment.content}
                  </p>
                }
              />
            </div>
          ))}

        </div>

      </div>
      <Menu cat={post.category} pid={post.id} />
    </div>
  );
};

export default Single;
