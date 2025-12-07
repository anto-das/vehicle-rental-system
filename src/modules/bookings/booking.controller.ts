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
    try {
        const result = await bookingService.getBookings(req);
         if(result.rowCount === 0){
            res.status(404).send({
                success:false,
                message:"bookings not found"
            })
        } else if(result.rows.length === 1){
            res.status(200).send({
                success:true,
                message:"Your bookings retrieved successfully",
                data:result.rows
            })
        }
        else{
            res.status(200).send({
                success:true,
                message:"Bookings retrieved successfully",
                data:result.rows
            })
        }
    } catch (err:any) {
        res.status(500).send({
            success:false,
            message:err.message
        })
    }
}

export const bookingController ={
    postBookings,
    getAllBookings
}