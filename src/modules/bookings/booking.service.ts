
import { Request } from "express";
import { pool } from "../../config/db";
import numberOfDays from "../../utilities/number_of_days";
import { vehicleService } from "../vehicles/vehicles.services";
import { userService } from "../users/users.service";
const postBookings = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const number_of_days = numberOfDays(rent_start_date, rent_end_date);

  const getSingleVehicle = await vehicleService.getSingleVehicle(vehicle_id);
  if (getSingleVehicle.rows[0] === undefined) {
    return null;
  }
  const { daily_rent_price, vehicle_name } = getSingleVehicle.rows[0];

  const totalPrice = daily_rent_price * number_of_days;
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
   const customers =await pool.query(`SELECT * FROM users`);
  const vehicles = await vehicleService.getVehicles();
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

export const bookingService = {
  postBookings,
  getSingleBookings,
  getBookings
};
