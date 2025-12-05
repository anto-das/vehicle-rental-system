import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  db_connection_url: process.env.DB_CONNECTION_URL,
  port:Number(process.env.PORT) || 8080,
};

export default config;
