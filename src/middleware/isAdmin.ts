import { NextFunction, Request, Response } from "express";

const isAdmin = async (req:Request,res:Response,next:NextFunction) =>{
    const id = req.params.id;
    const admin = req.user?.role;
    const adminId = String(req.user?.id);
    if(admin !== "admin" && adminId !== id){
        res.status(403).send({
            success:false,
            message:"you can't access others info"
        })
        return
    }
    next()
}

export default isAdmin;