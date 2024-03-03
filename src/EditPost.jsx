import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import "./CreatePost.jsx"

const EditPost = () => {
  const {_id}=useParams();
  const {_ID}=useParams();
  const [EditedPost , setEditedPost] =useState([]);
  const [post, setPost] = useState([]);
  const [EditImage, setEditImage] =useState('');
  const [EditCaption, setEditCaption]=useState('');
  const [EditLocation, setEditLocation]=useState('');

  useEffect(()=>{
    const getPostDetails=async()=>{
      try{
        const response=await fetch(`http://localhost:3001/${_id}/ShowPost/${_ID}`);
        if (!response.ok) throw Error('Did not receive expected data');
          const postData = await response.json();
          // console.log(postData);
          const userData = postData.find(item => item._id === _ID);
          console.log(userData);
          setPost(userData);
          setEditCaption(userData.Caption);
          setEditLocation(userData.Location);
      } catch (error) {
        console.error('Error fetching post details', error);
      }
    };
       setTimeout(()=>{
      (async ()=>await getPostDetails())();
  },2000);

}, [_id]);
  
  

  const fileInputRef=useRef(null);
  const navigate =useNavigate();
  

  return (
    <main className='main_box1'>
    <section className='Box1'>
    <h1 style={{textAlign:"center", color:"aqua"}}>Edit Your Post</h1>
    <form encType="multipart/form-data">
     
      <label htmlFor="Image">Upload New Image:</label>
      <input
        type="file"
        id="Image"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => setEditImage(e.target.files[0])}
      />
      {/* <button id='Image' onClick={handleImageUpload}>Upload</button> */}
      <br />
      <br />
      <label htmlFor="Caption">Edit Caption:</label>
      <input
        type="text"
        id="Caption"
        placeholder='Enter New Caption'
        onChange={(e) => setEditCaption(e.target.value)}
        value={EditCaption}
      />
       <br />
      <br />
      <label htmlFor="Location">Edit Location:</label>
      <input
        type="text"
        id="Location"
        placeholder='Enter New Location'
        onChange={(e) => setEditLocation(e.target.value)}
        value={EditLocation}
      />
      
      <br />
      <br />
      <button type="submit">Edit Post</button>
      {/* //{newImage && <Image cloudName="dhk1v7s3d " publicId={newImage.name.replace(/\s/g, '_')}/>} */}
    </form>
    </section>
  </main>
); 
  
}

export default EditPost