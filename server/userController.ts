import userSchema from "./userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

interface userDataTypes {
    username : string,
    email : string,
    password : string,
    contactNo : number,
    address : string,
    role : string,
    gender : string,
    dateOfBirth : string,
    acknowledge : boolean
}

// Create new user
const createUser = async( req: Request, res: Response )=>{
    try {
        const userDatas: userDataTypes = req.body;
        const { username, email, password, contactNo, address, role, gender, dateOfBirth, acknowledge } = userDatas;
        
        const existingUser = await userSchema.findOne({
            $or: [ 
                { email }, 
                { contactNo } 
            ]
        });
        if(existingUser){
            return res.status(400).json({ message:"User already exists with same email or phone number" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userSchema.create({
            username, email, password: hashedPassword, contactNo, address, role, gender, dateOfBirth, acknowledge
        })
        return res.status(201).json({ message:"User created successfully", data: newUser });
    } catch (error) {
        return res.status(400).json({ message:"Internal server error" })
    }
}

// Fetch all users
const getAllUsers = async( req: Request, res: Response )=>{
    try {
        const users = await userSchema.find();
        return res.status(200).json({ message:"Users fetched successfully", data: users });
    } catch (error) {
        return res.status(400).json({ message:"Internal server error" })
    }
}

// Fetch user by Id
const getUserById = async( req: Request, res: Response )=>{
    try {
        const { id } = req.params;
        const user = await userSchema.findById(id);
        return res.status(200).json({ message:"User fetched successfully", data: user });
    } catch (error) {
        return res.status(400).json({ message:"Internal server error" })
    }
}

// Update user by Id
const updateUser = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const updated = await userSchema.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ message: "User updated successfully", updated });
    } catch (error) {
        return res.status(400).json({ message:"Internal server error" });
    }
};

// Delete user
const deleteUser = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const deleted = await userSchema.findByIdAndDelete(id);
        return res.status(200).json({ message: "User deleted successfully", deleted });
    } catch (error) {
        return res.status(400).json({ message:"Internal server error" });
    }
};

export default { createUser, getAllUsers, getUserById, updateUser, deleteUser };
