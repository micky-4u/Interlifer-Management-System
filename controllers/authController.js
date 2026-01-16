import express from 'express';
import {userLogin} from '../services/authService.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) =>{

    try{
        const  { username, password } = req.body; 
        console.log("Login attempt for user:", username);

        if(!username || !password){
            return res.status(400).json({message: "Username and password are required"});
        }

        const user = await userLogin(username, password);

        // return res.status(200).json({message: "Login successful", user: user});
        jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if(err){
                return res.status(500).json({message: "Error generating token", error: err.message});
            }
            res.status(200).json({message: "Login successful",data:user, token: token});
        });

    }
    catch(err){
        res.status(500).json({message: "Error logging in", error: err.message});
    }
}
