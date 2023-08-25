import { Bot, GrammyError, HttpError, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";

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

import config from "./config";

const bot = new Bot<MyContext>(config.token);

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
  ctx.reply(
    "Nimadir noto'g'ri ketdi. /start buyrug'i yordamida botni qayta ishga tushiring."
  );
});

bot.catch(async (errorHandler) => {
  const ctx = errorHandler.ctx;

  // ctx.reply(
  //   "Nimadir noto'g'ri ketdi. /start buyrug'i yordamida botni qayta ishga tushiring."
  // );

  const { error } = errorHandler;

  if (error instanceof GrammyError) {
    console.error("Error in request:", error.stack);
  } else if (error instanceof HttpError) {
    console.error("Could not contact Telegram:", error);
  } else {
    console.error("Unknown error:", error);
  }
});

// Polling
// bot.start({ drop_pending_updates: true });

// Webhook
export default bot;
