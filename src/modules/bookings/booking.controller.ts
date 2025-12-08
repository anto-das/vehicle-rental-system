import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const postBookings = async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  try {
    const result = await bookingService.postBookings(req.body,userId);
  if(result === false){
    res.status(403).send({
      success:false,
      message:"you can't booked please give your customer id"
    })
  } else if (result===null) {
      res.status(404).send({
        success: false,
        message: "vehicle not found",
      });
    } else {
      res.status(201).send({
        success: true,
        message: "Booking created successfully",
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  const user = req.user;
  try {
    const result = await bookingService.getBookings(user as JwtPayload);
    if (result.rowCount === 0) {
      res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    } else if (result.rows.length === 1) {
      res.status(200).send({
        success: true,
        message: "Your bookings retrieved successfully",
        data: result.rows,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Bookings retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateBookings = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user =req.user;
  try {
    const result = await bookingService.updateBookings(req.body,user as JwtPayload,id as string);
   if( result ===null){
    res.status(403).send({
      success:false,
      message:"Sorry! You can't change status"
    })
   }else if(result === false){
         res.status(403).send({
            success:false,
            message:"Sorry! You can't cancelled your booking"
        })
    }else if(result.rowCount === 0){
       res.status(404).send({
            success:false,
            message:"Booking not found"
        })
    }else{
        res.status(200).send({
            success:true,
            message:"Booking cancelled successfully",
            data:result?.rows[0]
        })
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message:err.message
    });
  }
};



export const bookingController = {
  postBookings,
  getAllBookings,
  updateBookings,
};
