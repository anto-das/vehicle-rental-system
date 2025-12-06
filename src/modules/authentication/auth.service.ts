import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
const signUpUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const hashedPassword = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, hashedPassword, phone, role]
  );
  return result;
};
const signInUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return false;
  }
  const {id,name,email:userEmail,phone,role} =user;
  const token = jwt.sign({id:id,name:name,email:userEmail,phone:phone,role:role},config.jwt_secret_token as string,{"expiresIn":"8d"})
  return {token,user:{id:id,name:name,email:userEmail,phone:phone,role:role}}
};
export const authService = {
  signUpUser,
  signInUser,
};
