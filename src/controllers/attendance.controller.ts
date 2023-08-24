import { InlineKeyboard } from "grammy";
import MyContext from "../types/my-context";
import Absence from "../interfaces/absence-data";

export default async (ctx: MyContext) => {
  await ctx.answerCallbackQuery("Ozgina kuting...");

  await ctx.deleteMessage();

  const res = await fetch(process.env.TARGET + `education/attendance`, {
    headers: { Authorization: "Bearer " + ctx.session.token },
  });

  const { data, success } = await res.json();

  if (!success) {
    return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
      reply_markup: new InlineKeyboard().text("🔑 Hisobga kirish", "login"),
      parse_mode: "Markdown",
    });
  }

  let text = "*Qoldirgan darslaringiz*:\n\n";

  data.forEach((item: Absence) => {
    let date = new Date(item.lesson_date * 1000).toLocaleDateString("UZ");
    text += `${item.semester.name} | *${item.subject.name}* | _${date}_ — \`${item.lessonPair.start_time}\`\n`;
  });

  await ctx.reply(text, {
    reply_markup: new InlineKeyboard().text("🏠 Bosh sahifa", "home"),
    parse_mode: "Markdown",
  });
};
