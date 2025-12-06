// {
//   id: 2,
//   vehicle_name: 'Toyota Camry 2024',
//   type: 'car',
//   registration_number: 'ABC-1235',
//   daily_rent_price: '50',
//   availability_status: 'available'
// }
// {
//   customer_id: 1,
//   vehicle_id: 2,
//   rent_start_date: '2024-01-15',
//   rent_end_date: '2024-01-20'
// }

import { pool } from "../../config/db";
import numberOfDays from "../../utilities/number_of_days";
import { vehicleService } from "../vehicles/vehicles.services";
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

// 1st step: query diye bookings gula niye ashbo then jei result ta ashbe oitar length jodi 1 theke boro hoy tah

export const bookingService = {
  postBookings,
  getSingleBookings
};
