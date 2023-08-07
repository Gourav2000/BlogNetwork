import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BackendURLs } from "../utitlity/backendURLs";
import { BiLinkExternal } from 'react-icons/bi'


const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BackendURLs.GET_ALL_POSTS}${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];
  
  const qickLinks=[
    {
      id:1,
      title:"IIT bombay"
    },
    {
      id:2,
      title:"IIT kharagpur"
    },
    {
      id:3,
      title:"IIT roorkee"
    },
    {
      id:4,
      title:"IIT guwahati"
    },
    {
      id:5,
      title:"IIT kanpur"
    }
  ]
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }



  return (
    <div className="home">
      <div className="posts">
        {[...posts].reverse().map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`${BackendURLs.GET_IMAGE_BY_IMAGEID}/${post.image}`} alt="" />
            </div>
            <div className="content">
              <h1>{post.title}</h1>
              <p >{getText(`${post.content.slice(0, 500)}....`)}</p>
              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="sideBar">
        <div className="quickNav">
          <h1>Quick Navigation</h1>
          {posts.map((post)=>(
            <div className="link">
              <Link>{getText(`${post.title.slice(0, 30)}`)} {post.title.length>30?(`...`):(``)}<BiLinkExternal/></Link>
            </div>
          ))}
        </div>
        <div className="quickLinks">
        <h1>Quick Links</h1>
          {qickLinks.map((url)=>(
            <div className="link">
              <Link>{getText(`${url.title.slice(0, 30)}`)} {url.title.length>30?(`...`):(``)}<BiLinkExternal/></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
