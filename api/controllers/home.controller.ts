import { InlineKeyboard } from "grammy";
import MyContext from "../types/my-context";
import mainMenu from "../middlewares/main-menu";
import config from "../config";

export default async (ctx: MyContext) => {
  ctx.deleteMessage();

  let keyboard;
  let text = `*${config.name}*\n*HEMIS Student axborot tizimi*\n\n`;

  if (!ctx.session.token) {
    text += "_Foydalanish uchun avval hisobingizga kiring._";
    keyboard = new InlineKeyboard().text("🔑 Hisobga kirish", "login");
  } else {
    keyboard = mainMenu;
  }

  ctx.reply(text, {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
};
