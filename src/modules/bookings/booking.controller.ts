import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const postBookings = async(req:Request,res:Response) =>{
    try {
        const result =await bookingService.postBookings(req.body);
        if(!result){
            res.status(404).send({
                success:false,
                message:"vehicle not found"
            })
        } else{
            res.status(201).send({
            success:true,
            message:"Booking created successfully",
            data:result
        })
        }
    } catch (err:any) {
        res.status(500).send({
            success:false,
            message:err.message
        })
    }
}

const getAllBookings = async(req:Request,res:Response) =>{
    
}

export const bookingController ={
    postBookings,
    getAllBookings
}