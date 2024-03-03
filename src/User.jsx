import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './User.css';

const User = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [user,setUser]=useState(null);
  const API_URL = 'http://localhost:3001/getUsers';
  const [data, setData] = useState([]);
  const [postCount,setPostCount]=useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const result = await response.json();
        console.log(result);
        const userData = result.find(item => item._id === _id);
        if (userData) {
          console.log(userData.username);
          setData(userData.posts);
           setUser(userData.username);
        } else {
          setData([]);
        }
        setFetchError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setFetchError(err.message);
      }
    };
  
 
    //console.log(postCount)
    fetchItems();
  }, [_id]); 

  const handleCreatePost = () => {
    navigate(`/${_id}/CreatePost`);
  };
  const handleViewPost=(_ID)=>{
    navigate(`/${_id}/ShowPost/${_ID}`);
  };
  // console.log(data.length);
  const handleLogout=async()=>{
    try {
      const response = await fetch('http://localhost:3001/logout');
      if (!response.ok) throw Error('Did not receive expected data');
      console.log(response);
      if(response.status===200){
        alert("User Logged Out !!");
        navigate('/login');
      }
      } 
      catch (err) {
      console.error('Error fetching data:', err);
      setFetchError(err.message);
    }
  }
  return (
    <div>
    <main className={data.length>=0&&data.length<=3?'main_box2345':"main_box"}>
    <header>
        <div className='Buttons'>
          <button onClick={handleCreatePost} className='CreateNewPost'>Create New Post</button>
        </div>
        <h1 className='userTitle'><b>Welcome {user}!</b></h1>
        <Link to='/logout'><button className='logout' onClick={handleLogout}>Logout</button></Link>
      </header>
      <br />
      <hr />
      <div className='H1'><h1>{data.length===0?"No Post Available":"Posts"}</h1>
      </div>
        <main className='AllPosts'>
      {
        data && data.map((post, index) => (
          <div key={index} id="card1">
            <img src={post.image} alt={`Post ${index}`} />
            <div className="desc">
              <h3 style={{color:'wheat'}}>Caption: {post.Caption}</h3>
              <button onClick={() => handleViewPost(post._id)} className='Butto'>View Post</button>
              {/* <p>Location: {post.Location}</p> */}
            </div>
          </div>
        ))
      }
      </main>
    </main>
    </div>
  );
};

export default User;
