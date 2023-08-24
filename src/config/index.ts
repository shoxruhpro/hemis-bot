import { config } from "dotenv";

config();

export default {
  channel: process.env.CHANNEL as string,
};
