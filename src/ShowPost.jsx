import React from 'react'
import { Link,useParams ,useNavigate} from 'react-router-dom'
import { useState ,useEffect} from 'react';
import "./ShowPost.css"
import mapboxgl from 'mapbox-gl';



const ShowPost = () => {
    const { _id } = useParams();
    const [post, setPost] = useState([]);
    console.log(_id);
    const {_ID} =useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchPostDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3001/${_id}/ShowPost/${_ID}`);
          if (!response.ok) throw Error('Did not receive expected data');
          const postData = await response.json();
          const userData = postData.find(item => item._id === _ID);
          console.log(userData);
          setPost(userData);
        } catch (error) {
          console.error('Error fetching post details', error);
        }
      };
        setTimeout(()=>{
            (async ()=>await fetchPostDetails())();
        },2000);
      
    }, [_id]);
    console.log(post);
    useEffect(() => {
      const Mapbox123 = () => {
        if (post && post.geometry && post.geometry.coordinates) {
          console.log(post.geometry.coordinates[0]);
          const latitude = post.geometry.coordinates[1];
          const longitude = post.geometry.coordinates[0];
          // Initialize Mapbox after the post data is loaded
          mapboxgl.accessToken = 'pk.eyJ1IjoibmlsYXlyYXRob2QxMzAzIiwiYSI6ImNscWc1Nzd5eTE1dXoya211c3Z0ZmY1aW8ifQ.iwLdabASJKmdRjDs7ud5gA';
          const map = new mapboxgl.Map({
            container: 'map',
            center: [longitude, latitude],
            zoom: 7
          });
          new mapboxgl.Marker({ color: 'red' })
            .setLngLat([longitude, latitude])
            .addTo(map);
        }
      };
      
      setTimeout(()=>{
        (async ()=>await Mapbox123())();
    },5000);
    }, [post]);
  
    if (!post) {
        return <div>Loading...</div>;
      }
    
    const handleDelete=async()=>{
      try{
        const response=await fetch(`http://localhost:3001/${_id}/ShowPost/${_ID}`,{
          method:'DELETE',
        });
        const HandleRedirect=()=>{
          navigate(`/${_id}`)
        }
        HandleRedirect();
      }catch(error){
        console.error('Error deleting post',error);
      } 
    }
    const handleUpdate=()=>{
      navigate(`/${_id}/ShowPost/${_ID}/EditPost`);
    }
  return (
    <main className='Box12'>
     <section className='PostInfo'>
          <h2 className='Caption'>Caption : {post.Caption}</h2>
         <div className='image'><img className='image' src={post.image}/></div>
         
         <h2 className='Location'>Location : {post.Location}</h2>
          <h3 className='Location'>Your Location</h3>
          <div className='MAPS'>
          
          <br></br>
           <div id='map'></div>
          </div>
          <div className='Change'>
            <button onClick={handleDelete} >Delete Post</button>
            <button onClick={handleUpdate}>Edit Post</button>
          </div>
     </section>
     </main>
  )
}

export default ShowPost