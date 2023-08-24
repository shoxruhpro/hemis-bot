import { InlineKeyboard } from "grammy";
import MyContext from "../types/my-context";

export default async (ctx: MyContext) => {
  if (!ctx.session.document_id) {
    const res = await fetch(process.env.TARGET + "student/document", {
      headers: { Authorization: `Bearer ${ctx.session.token}` },
    });

    const { data, success } = await res.json();

    if (success) {
      ctx.session.document_id = data[0].id;
    } else {
      return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
        reply_markup: new InlineKeyboard().text("🔑 Hisobga kirish", "login"),
        parse_mode: "Markdown",
      });
    }
  }

  await ctx.editMessageText("*Hujjatlar*", { parse_mode: "Markdown" });
};
