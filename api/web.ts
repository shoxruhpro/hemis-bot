import express from "express";
import { webhookCallback } from "grammy";
import bot from "./bot";
import config from "./config";

const app = express();

app.use(express.json());

app.all("/status", async (req, res) => {
  res.sendStatus(200);
});

app.use(
  "/bot",
  webhookCallback(bot, "express", { secretToken: config.secret_token })
);

app.listen(3000).on("error", (event) => {
  console.log("Xatolik yuz berdi", event.cause);
});
