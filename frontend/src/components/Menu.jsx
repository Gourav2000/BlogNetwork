import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackendURLs } from "../utitlity/backendURLs";
import { Link } from "react-router-dom";


const Menu = ({ cat, pid, uid }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("pid=", pid)
    const fetchData = async () => {
      try {
        var res;
        if (uid != null)
          res = await axios.get(`${BackendURLs.GET_POST_BY_UID}/${uid}`);
        else {
          res = await axios.get(`${BackendURLs.GET_ALL_POSTS}?cat=${cat}`);
          for (var i = 0; i < res.data.length; ++i) {
            console.log("pid=", pid)
            console.log(" resId=", res.data[i].id)
            if (res.data[i].id === pid) {
              res.data.splice(i, 1);
              break;
            }
          }
        }
        console.log(res.data)
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
  return (
    <div className="menu">
      {pid && <h1>Other posts you may like</h1>}
      {posts.length === 0 ? (<h1>No posts made by the user</h1>)
        : (<div>
          {[...posts].reverse().map((post) => (
            <div className="post" key={post.id}>
              <img src={`${BackendURLs.GET_IMAGE_BY_IMAGEID}/${post.image}`} alt="" />
              <h2>{post.title}</h2>
              <Link to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          ))}
        </div>)}

    </div>
  );
};

export default Menu;
