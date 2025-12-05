import { pool } from "../../config/db";

const postVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getSingleVehicle = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
  return result;
};

const updateVehicle = async (payload:Record<string,unknown>,id:string) => {
  const {vehicle_name,type,registration_number,daily_rent_price,availability_status} = payload;
   let idx = 1;
    const values = [];
    const fields:string[] = [];

    if(vehicle_name !== undefined){
        fields.push(`vehicle_name=$${idx++}`);
        values.push(vehicle_name);
    }
    if(type !== undefined){
        fields.push(`type=$${idx++}`);
        values.push(type)
    }
    if(registration_number !== undefined){
        fields.push(`registration_number=$${idx++}`);
        values.push(registration_number)
    }
    if(daily_rent_price !== undefined){
        fields.push(`daily_rent_price=$${idx++}`);
        values.push(daily_rent_price)
    }
    if(availability_status !== undefined){
        fields.push(`availability_status=$${idx++}`);
        values.push(availability_status)
    }
    values.push(id)
  const result = await pool.query(
    `UPDATE vehicles SET ${fields.join()} WHERE id=$${idx} RETURNING *`,
    values
  );
  return result;
};

const deleteVehicle = async(id:string) =>{
  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`,[id]);
  return result
}

export const vehicleService = {
  postVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle
};
