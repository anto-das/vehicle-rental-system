import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  db_connection_url: process.env.DB_CONNECTION_URL,
  jwt_secret_token: process.env.JWT_SECRET_TOKEN,
  port: Number(process.env.PORT) || 8080,
};

export default config;
