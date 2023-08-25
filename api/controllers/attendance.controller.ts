import { InlineKeyboard } from "grammy";
import MyContext from "../types/my-context";
import Absence from "../interfaces/absence-data";
import config from "../config";

export default async (ctx: MyContext) => {
  ctx.answerCallbackQuery("Iltimos, kuting...");
  ctx.deleteMessage();

  const res = await fetch(config.target + `education/attendance`, {
    headers: { Authorization: "Bearer " + ctx.session.token },
  });

  const { data, success } = await res.json();

  if (!success) {
    return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
      reply_markup: new InlineKeyboard().text("🔑 Hisobga kirish", "login"),
      parse_mode: "Markdown",
    });
  }

  let text = `*Qoldirgan darslaringiz*: ${data.length} ta\n`;

  let semester = ""; // Semesterlarni ajratish uchun.

  data.forEach((item: Absence) => {
    let date = new Date(item.lesson_date * 1000).toLocaleDateString("UZ");

    if (semester !== item.semester.name) {
      text += `\n*${item.semester.name}\n\n*`;
      semester = item.semester.name;
    }

    text += `*${item.subject.name}* | _${date}_ — \`${item.lessonPair.start_time}\`\n`;
  });

  ctx.reply(text, {
    reply_markup: new InlineKeyboard().text("🏠 Bosh sahifa", "home"),
    parse_mode: "Markdown",
  });
};
