import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 5000;

export const URLDB = process.env.MONGODB_URI;