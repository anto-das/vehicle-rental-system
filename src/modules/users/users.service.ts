import { pool } from "../../config/db";

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
  let idx = 1;
  const values = [];
  const fields: string[] = [];

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

  const user = await getSingleUser(id);
  const userRole = user.rows[0]?.role;
  if (role !== undefined) {
    fields.push(`role=$${idx++}`);
    if (role !== userRole) {
      values.push(userRole);
    }
  }
  values.push(id);
  const result = await pool.query(
    `UPDATE users SET ${fields.join()} WHERE id=$${idx} RETURNING *`,
    values
  );
  return result;
};

const deleteUser = async(id:string) =>{
    const result = await pool.query(`DELETE FROM users WHERE id=$1`,[id])
    return result;
}

export const userService = {
  getAllUser,
  updateUser,
  deleteUser
};
