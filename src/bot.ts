import { Bot, GrammyError, HttpError, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { config } from "dotenv";

import homeController from "./controllers/home.controller";
import loginController from "./controllers/login.controller";
import passwordController from "./controllers/password.controller";

import login from "./middlewares/login";
import mainMenu from "./middlewares/main-menu";
import updatePassword from "./middlewares/update-password";

import initial from "./utils/initial";
import type MyContext from "./types/my-context";
import schedule from "./middlewares/schedule";
import scheduleController from "./controllers/schedule.controller";

config();

const bot = new Bot<MyContext>(process.env.TOKEN as string);

// Middlewares
bot.use(session({ initial }));
bot.use(conversations());
bot.use(createConversation(login));
bot.use(createConversation(updatePassword));
bot.use(createConversation(schedule));
bot.use(mainMenu);

// Routes
bot.command("start", homeController); // Start bosilganda
bot.callbackQuery("login", loginController); // Avtorizatsiya
bot.callbackQuery("home", homeController); // Bosh sahifaga qaytish kerak bo'lsa
bot.callbackQuery("update-password", passwordController); // Parolni o'zgaritirish uchun
bot.callbackQuery("schedule", scheduleController); // Dars jadvalini olish uchun

bot.on("message", async (ctx) => {
  await ctx.reply(
    "Nimadir noto'g'ri ketdi. /start buyrug'i yordamida botni qayta ishga tushiring."
  );
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.stack);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start({ drop_pending_updates: true });
