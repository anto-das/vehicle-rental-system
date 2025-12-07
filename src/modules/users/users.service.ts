import { pool } from "../../config/db";
import { bookingService } from "../bookings/booking.service";

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  return result;
};

const updateUser = async (payload: Record<string, unknown>, id: string) => {
  const { name, email, phone, role } = payload;
  const user = await getSingleUser(id);
   let idx = 1;
  const values = [];
  const fields: string[] = [];
  //user found check
  if(user.rows.length ===0){
    return user;
  }
  const getUser = user.rows[0];
  const isAdmin = getUser.role ==="admin";
  const isCustomer = getUser.role ==="customer" && getUser.id===id;
  if(!isAdmin && isCustomer){
    return null;
  }

  if (name !== undefined) {
    fields.push(`name=$${idx++}`);
    values.push(name);
  }
  if (email !== undefined) {
    fields.push(`email=$${idx++}`);
    values.push(email);
  }
  if (phone !== undefined) {
    fields.push(`phone=$${idx++}`);
    values.push(phone);
  }
  if(role !== undefined && isAdmin){
    fields.push(`role=$${idx++}`)
    values.push(role)
  }
  values.push(id);
  const result = await pool.query(
    `UPDATE users SET ${fields.join(", ")} WHERE id=$${idx} RETURNING *`,
    values
  );
  return result;
};

const deleteUser = async (id: string) => {
  const bookings = await bookingService.getSingleBookings(id);
  if (bookings.rows.length > 0) {
    return null;
  }
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return result;
};

export const userService = {
  getAllUser,
  updateUser,
  deleteUser,
  getSingleUser
};
