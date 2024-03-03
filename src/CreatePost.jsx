import React, { useState, useRef } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import { Image } from 'cloudinary-react';
import "./CreatePost.css"
// import { JSON } from 'body-parser';

const CreatePost = () => {
  const { _id } = useParams();
  const [newImage, setNewImage] = useState(null); 
  const [newCaption, setNewCaption] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const fileInputRef = useRef(null); 
  const navigate = useNavigate();
 
  const handleImageUpload=async()=>{
    
    const formData=new FormData();
    formData.append('file',newImage);
    formData.append('upload_preset','f72cplpn');
    formData.append('cloud_name',"dhk1v7s3d");
    
    
     fetch('https://api.cloudinary.com/v1_1/dhk1v7s3d/image/upload', {
        method: 'post',
        body: formData,
      }).then((res)=>res.json())
        .then((data)=>{
          
          let nIU = data.secure_url;
          let nC = newCaption;
          let nL=newLocation;
          addData( nIU, nC,nL);
        })
        .catch((err)=>console.log(err)); 
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    handleImageUpload();

    alert("Post Created");
    navigate(`/${_id}`)
  };

  const addData = async ( imageUrl, caption,Location) => {
    const i=imageUrl.toString();
    
    const dataToSend = { i,caption,Location};
    try {
      const response = await fetch(`http://localhost:3001/CreatePost/:${_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      console.log(result);

    } catch (error) {

      console.log('Error sending data to backend:');
      console.error(error);
    };
  };
  

  return (
    <main className='main_box1'>
      <section className='Box1'>
      <h1 style={{textAlign:"center", color:"aqua"}}>Create New Post</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
       
        <label htmlFor="Image">Upload Image:</label>
        <input
          type="file"
          id="Image"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setNewImage(e.target.files[0])}
        />
        {/* <button id='Image' onClick={handleImageUpload}>Upload</button> */}
        <br />
        <br />
        <label htmlFor="Caption">Caption:</label>
        <input
          type="text"
          id="Caption"
          placeholder='Enter Caption'
          onChange={(e) => setNewCaption(e.target.value)}
          value={newCaption}
        />
         <br />
        <br />
        <label htmlFor="Location">Location:</label>
        <input
          type="text"
          id="Location"
          placeholder='Enter Location'
          onChange={(e) => setNewLocation(e.target.value)}
          value={newLocation}
        />
        
        <br />
        <br />
        <button type="submit">Create Post</button>
        {/* //{newImage && <Image cloudName="dhk1v7s3d " publicId={newImage.name.replace(/\s/g, '_')}/>} */}
      </form>
      </section>
    </main>
  );
};

export default CreatePost;
