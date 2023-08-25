import { InlineKeyboard, InputFile } from "grammy";
import MyContext from "../types/my-context";
import config from "../config";

export default async (ctx: MyContext) => {
  ctx.answerCallbackQuery("Yuklanmoqda...");
  ctx.deleteMessage();

  const res = await fetch(
    config.target +
      `student/document-download?id=${ctx.session.document_id}&type=academic_data`,
    {
      headers: { Authorization: "Bearer " + ctx.session.token },
    }
  );

  if (!res.ok) {
    return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
      reply_markup: new InlineKeyboard().text("🔑 Hisobga kirish", "login"),
      parse_mode: "Markdown",
    });
  }

  const buffer = await res.arrayBuffer();

  ctx.replyWithDocument(
    new InputFile(new Uint8Array(buffer), "Reyting daftarchasi.pdf"),
    {
      reply_markup: new InlineKeyboard().text("🏠 Bosh sahifa", "home"),
    }
  );
};
