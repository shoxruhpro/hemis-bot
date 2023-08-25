import { config } from "dotenv";

config();

export default {
  channel: process.env.CHANNEL as string,
  token: process.env.TOKEN as string,
  target: process.env.TARGET as string,
  name: process.env.NAME as string,
  secret_token: process.env.SECRET_TOKEN as string,
};
