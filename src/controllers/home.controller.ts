import { InlineKeyboard } from "grammy";
import MyContext from "../types/my-context";
import mainMenu from "../middlewares/main-menu";

export default async (ctx: MyContext) => {
  let keyboard;
  await ctx.deleteMessage();

  let text = `*${process.env.NAME}*\n*HEMIS Student axborot tizimi*\n\n`;

  if (!ctx.session.token) {
    text += "_Foydalanish uchun avval hisobingizga kiring._";
    keyboard = new InlineKeyboard().text("🔑 Hisobga kirish", "login");
  } else {
    keyboard = mainMenu;
  }

  await ctx.reply(text, {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
};
