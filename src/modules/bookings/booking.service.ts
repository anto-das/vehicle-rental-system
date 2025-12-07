
import { Request } from "express";
import { pool } from "../../config/db";
import numberOfDays from "../../utilities/number_of_days";
import { vehicleService } from "../vehicles/vehicles.services";
import { userService } from "../users/users.service";
import { Result } from "pg";
const postBookings = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const number_of_days = numberOfDays(rent_start_date, rent_end_date);
  // find out single vehicle using vehicle_id
  const getSingleVehicle = await vehicleService.getSingleVehicle(vehicle_id);
  if (getSingleVehicle.rows[0] === undefined) {
    return null;
  }
  const { daily_rent_price, vehicle_name } = getSingleVehicle.rows[0];

  const totalPrice = daily_rent_price * number_of_days;
  // set availability status available to booked
  const updateVehicle = await vehicleService.updateVehicle(
    { availability_status: "booked" },
    vehicle_id
  );
  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      "active",
    ]
  );
  const vehicleInfo = {
    ...result.rows[0],
    vehicle: { vehicle_name: vehicle_name, daily_rent_price: daily_rent_price },
  };
  return vehicleInfo;
};

const getSingleBookings = async (id: string) => {
  const result = await pool.query(`
    SELECT * FROM bookings WHERE customer_id=$1`,[id]);
    return result;
};

const getBookings = async(req:Request) =>{
  const id = String(req.user?.id);
  const userRole =req.user?.role;
  // all users and vehicles from database
   const customers =await pool.query(`SELECT * FROM users`);
  const vehicles = await vehicleService.getVehicles();
  // condition if user is customer 
  if(userRole !=="admin"){
    const result = await getSingleBookings(id);
    const {vehicle_id} =result.rows[0];
    const {vehicle_name,registration_number,type} =vehicles.rows?.find(vehicle => vehicle.id === vehicle_id)
    const getOwnBooking ={
      ...result.rows[0],
      vehicles:{
        vehicle_name,
        registration_number,
        type
      }
    }
    result.rows=[getOwnBooking]
   return result
  }
  // if user is admin 
  const result =await pool.query(`SELECT * FROM bookings`)
  const finalResult = result.rows.map(bookedResult =>{
    const {name,email} = customers.rows?.find(customer => customer.id === bookedResult.customer_id)
    const {vehicle_name,registration_number} =vehicles.rows?.find(vehicle => vehicle.id === bookedResult.vehicle_id);
    const adminResult ={
      ...bookedResult,
      customer:{
        name,
        email,
      },
      vehicle:{
        vehicle_name,
        registration_number,
      }
    }
    return adminResult
  })
  result.rows =finalResult
  return result;
}

const updateBookings = async(payload:Record<string,unknown>,user:Record<string,unknown>,id:string) =>{
  const status = payload.status;
  // get booking where id is equal user given id
  const bookingData = await pool.query(`SELECT * FROM bookings WHERE id=$1`,[id]);
  // check admin and status
  if(user.role !=="admin" && status ==="returned"){
    return null
  }
  if(bookingData.rowCount === 0){
    return bookingData
  }
  // d'structuring booking data get date
  const {rent_start_date,status:bookedStatus} =bookingData.rows[0];
  const today = new Date();
  if(today >= rent_start_date && bookedStatus ==="active"){
    return false
  }
  //set update bookings
  const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,[status,id])
  const {vehicle_id} =bookingData.rows[0];
  const availability_status = bookedStatus ==="active" ? "booked" :"available";
  //update vehicle status
  const updateVehicle = await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,[availability_status,vehicle_id])
  if(user.role ==="admin" && status ==="returned"){
    const updateResult ={
      ...result.rows[0],
      vehicle:{availability_status:updateVehicle.rows[0]?.availability_status}
    }
    result.rows[0]=updateResult
  }
  return result;
}

export const bookingService = {
  postBookings,
  getSingleBookings,
  getBookings,
  updateBookings
};
