import { Request, Response } from "express";
import { authService } from "./auth.service";

const createUser = async(req:Request,res:Response) =>{
    try {
        const result = await authService.createUser(req.body);
        res.status(201).send({
            success:true,
            message:"User registered successfully",
            data:result.rows[0]
        })
    } catch (err:any) {
        res.status(500).send({
            success:false,
            message:err.message
        })
    }
}

export const authController ={
    createUser
}