import asyncHandler from 'express-async-handler' // handle like try catchs best used for interacting with databases
import User from '../models/userModel.js';
import generateToken from '../util/generateToken.js'

//@desc Auth user/set token
//route POST /api/users/auth
//@access public
const authUser = asyncHandler( async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email}) // finds the user with that email and stores it in user

    if(user && (await user.matchPassword(password))){ // this method is created in model to compare with hash password
        generateToken(res,user._id); // res is passed since cookie is created using res.cookie
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400);
        throw new Error("Invalid user email or password")
    }
})

//@desc Register users
//route POST /api/users
//@access public
const registerUser  = asyncHandler( async (req,res)=>{
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email}); // all model db returns promises so thats why we need to use async await

    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        // this is how a user is created User.create goes  to the userModel.js which is the middleware and 
        // thats where password hashing is done but it can be done here too
        password   
    });
    if(user){
        generateToken(res,user._id); // res is passed since cookie is created using res.cookie
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data")
    }
})

//@desc Logout users
//route POST /api/users/logout
//@access public
const logoutUser  = asyncHandler( async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0) // expires now
    })
    res.status(200).send({message:"user logout user"});

})

//@desc Get user profile
//route GET /api/users/profile
//@access private
const getUserProfile  = asyncHandler( async (req,res)=>{
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
  

    }

    


    res.status(200).send({ user});
})

//@desc Update user profile
//route PUT /api/users/profile
//@access private
const updateUserProfile  = asyncHandler( async (req,res)=>{
    
    const user = await User.findById(req.user._id)
   
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password =req.body.password; // this get hashed in the model itself
        }

        const updateUser = await user.save();
        console.log(updateUser)

        res.status(200).json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            password:updateUser.password
        })
    } else {
        res.status(404);
        throw new Error('user not found')
    }
})

export {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile}