/* The following line can be included in your src/index.js or App.js file */
import SignUp from "./SignUp.jsx";
import React from "react";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
// import backend from "./backend.js";
import { v4 as uuidv4 } from 'uuid';
import { useState,useEffect } from "react";
import ShowPost from "./ShowPost.jsx";
import {Routes,Route} from 'react-router-dom';
import User from "./User.jsx";
import CreatePost from "./CreatePost.jsx";
import UpdatePost from "./EditPost.jsx";
import EditPost from "./EditPost.jsx";



function App() {
  // const API_URL='http://localhost:3000/items';

  // const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [newUser, setNewUser] = useState('')
  const [newPwd, setNewPwd] = useState('');
  const [newEmail, setNewEmail] = useState('');
  // const [success, setSuccess] = useState(false);

  const [fetchError, setFetchError] =useState(null);
  
  
//   useEffect(() => {
//   const fetchItems =async()=>{
//     try{
//       const response =await fetch(API_URL);
//       if(!response.ok) throw Error('did not receive expected data');
//       const listItems=await response.json();
//       setItems(listItems);
//       console.log(listItems);
//       setFetchError(null);
//     }
//     catch(err)
//     {
//       //console.log(err.message);
//       setFetchError(err.message);
//     }
    
//   }
//   setTimeout(()=>{
//     (async ()=>await fetchItems())();
//   },2000);
  
// }, [])


  //   const id = items.length ? items[items.length - 1].id + 1 : 1;
  //   const myNewItem = {id, userName,password};
  //   const listItems = [...items, myNewItem];
  //   console.log(listItems);
  // setItems((prev)=>([...prev,newItem]));
    
    

  //   const postOptions={
  //     method:'POST',
  //     headers:{
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(listItems)
  //   }//used to add the new item to database(i.e. to post the new item to database) but when we tick on the option still the checked in database does not get true from false so we need to have and update option too

  //   const result=await apiRequest(API_URL,postOptions);
  //   console.log(result)
  //   if(result) setFetchError(result);
  // }
 
    
   

  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    {/* <Route path="/" element={<Footer/>}/> */}
       
       <Route path="/signUp">
           <Route index element={<SignUp newUser={newUser} setNewUser={setNewUser} newPwd={newPwd} setNewPwd={setNewPwd} newEmail={newEmail} setNewEmail={setNewEmail}  />} />
       </Route>
       <Route path="/login">
           <Route index element={<Login newUser={newUser} setNewUser={setNewUser} newPwd={newPwd} setNewPwd={setNewPwd} />} />
       </Route>
       <Route path="/:_id" element={<User/>}/>
       <Route path="/:_id/CreatePost" element={<CreatePost/>}/>
       <Route path="/:_id/ShowPost/:_ID" element={<ShowPost/>}/>
       <Route path="/:_id/ShowPost/:_ID/EditPost" element={<EditPost/>}/>

    
 </Routes>
    
  );
}

export default App;




