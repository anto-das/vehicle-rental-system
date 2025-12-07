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

const updateUser = async (
  payload: Record<string, unknown>,
  userRole: string,
  id: string,
  userId: string
) => {
  const { name, email, phone, role } = payload;
  let idx = 1;
  const values = [];
  const fields: string[] = [];
  const strId = String(userId);
  const isAdmin = userRole === "admin" && strId !== id;
  const isCustomer = userRole === "customer" && strId === id;
  if (!isAdmin && !isCustomer) {
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
  if (role !== undefined && isAdmin) {
    fields.push(`role=$${idx++}`);
    values.push(role);
  }
  if (isCustomer) {
    values.push(strId);
  } else {
    values.push(id);
  }
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
  getSingleUser,
};
