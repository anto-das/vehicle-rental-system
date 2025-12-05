import { Request, Response } from "express"
import { app } from "../../app"

const postVehicles =app.get("/vehicles", async(req:Request,res:Response) =>{
    res.status(200).send({
        message:"trigger vehicles router successfully"
    })
})

export const vehicleController ={
    postVehicles
}