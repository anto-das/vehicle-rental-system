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
    //1=>controller theke req tak pathabo service 
    // 2=>service req theke req.user ber kore ene tar role check dibo 
    //  3=> erpor condition diye result controller eh pathabo jodi user admin hoy tahole all bookings return korbo r jodi customer hoy own bookings return korbo
    // 
}

export const bookingController ={
    postBookings,
    getAllBookings
}