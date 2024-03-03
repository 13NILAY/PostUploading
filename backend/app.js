import express from "express";
const app = express();
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import Info from './models/info.js'
import cors from 'cors';
import path from "path";
import passport from "passport";
import multer from 'multer';
import cloudinary from "./cloudinary.js"

import LocalStrategy from "passport-local";
import session from "express-session";
import flash from "connect-flash";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';
const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoibmlsYXlyYXRob2QxMzAzIiwiYSI6ImNscWc1Nzd5eTE1dXoya211c3Z0ZmY1aW8ifQ.iwLdabASJKmdRjDs7ud5gA' });



const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
}

app.use(session(sessionOptions));
app.use(flash());
app.use(bodyParser.json());
app.use(cors()); 
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: true}));
passport.use(new LocalStrategy(Info.authenticate()));

passport.serializeUser(Info.serializeUser());
passport.deserializeUser(Info.deserializeUser());


app.use(express.urlencoded({extended: true}));

//app.use(express.static(path.join(__dirname,"/public")))

const MONGO_URL ="mongodb://127.0.0.1:27017/userdata";

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{console.log("connected to DB");})
       .catch((err)=>{console.log(err);})


app.get('/getUsers',async(req,res)=>{
    // console.log(req);
    Info.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err));
});

  app.get("/:_id/ShowPost/:_ID", async (req, res) => {
    try {
      const { _id } = req.params;
      const data = await Info.findById(_id);
      console.log(data.posts);
      res.status(200).json(data.posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });               
app.post("/signUp",async(req,res)=>{
  try{
    let {username,password,email}=req.body;

     const newUser= new Info({username,email});

    const registerUser= await Info.register(newUser,password);
    console.log(registerUser._id);
    // //await newInfo.save();
    // // res.redirect("http://localhost:3000")
    let id=registerUser._id;
     res.status(200).json({mesage:"success",_id:id})
    
  }
  catch(e){
    // alert("User already exist with the given username !!Pls sign up with another Username");
     console.log(e);
     res.status(500).json({error:e})
  
}   
});

app.post("/login",
    passport.authenticate("local",{
        //failureMessage:"Invalid Credentials Please try again ",
         failureFlash:true
    }),
async(req,res)=>{
   
    if (!req.authInfo) {
      res.status(401);
      return;
  }
  let id = req.user._id;
    console.log(id);
    res.status(200).json({ message: "success", _id: id });

})

app.get("/login",async(req,res)=>{
   let username=req.body;
   console.log(username);
})

app.post('/CreatePost/:_id',async(req,res)=>{

    try{
      
      let {i,caption,Location}=req.body;
   
      console.log(i);
      console.log(caption);
      console.log(Location);
  
      let response=await geocodingClient.forwardGeocode({
        query: Location,
        limit: 1
      }).send()
       console.log(response.body.features[0].geometry);
       const geo=response.body.features[0].geometry;
       console.log(geo);
       let {_id}=req.params;
       let cleanedId = _id.replace(':', '');
        console.log(cleanedId);

        const data = await Info.findById(cleanedId);
      console.log(data);
      //const infor=await Info.findByIdAndUpdate({_id:cleanedId},{posts:[{image:`${i}`,Caption:`${caption}`,Location:`${Location}`,geometry:geo}]}).then((res)=>{console.log(res)});
      const newPost= [
        { 
          image:`${i}`,
          Caption:`${caption}`,
          Location:`${Location}`,
          geometry:geo
        }
      ];
      const addMorePostsToExistingDocument=async(cleanedId, newPost)=> {
        try {
            const OldInfo = await Info.findById(cleanedId);
            if (OldInfo) {   
                OldInfo.posts = OldInfo.posts.concat(newPost); 
                await OldInfo.save();
                console.log("Posts added successfully");
            } else {
                console.log("User not found");
            }
        } catch (error) {
            console.error(error);
        }
    }
    addMorePostsToExistingDocument(cleanedId, newPost);
      
    }
    catch(error){
      console.log(error);
    }
  });
  app.delete("/:_id/ShowPost/:_ID", async (req, res) => {
    const { _id } = req.params;
    const {_ID}=req.params;
    console.log(_id);
    console.log(_ID);

    try {
      const updatedUser = await Info.findOneAndUpdate(
        { _id: _id },
        { $pull: { posts: { _id: _ID } } },
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "Post not found" });
      }
      console.log('Post deleted successfully');
      //res.redirect("/");
       
    } catch (error) {
      console.error("Error deleting post", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

 app.get("/logout",(req,res)=>{
  req.logOut((err)=>{
    if(err){
      console.log(err);
    }
    res.status(200).json({message:"User Logged Out"});
  })
 })
app.listen(3001,()=>{
    console.log("Server is listening to port 3001");
});
