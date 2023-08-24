import { InlineKeyboard } from "grammy";
import MyContext from "../types/my-context";
import MyConversation from "../types/my-conversation";

export default async function updatePassword(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("*Yangi parolni kiriting*", {
    reply_markup: new InlineKeyboard().text("🔙 Bekor qilish", "home"),
    parse_mode: "Markdown",
  });

  // Parolni olamiz
  const nextCtx = await conversation.waitFor(":text");
  const password = nextCtx.message?.text.trim();

  const res = await fetch(process.env.TARGET + "account/update", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ctx.session.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      confirmation: password,
      change_password: true,
    }),
  });

  await nextCtx.deleteMessage(); // Parolni o'chiramiz

  const { success } = await res.json();

  const chat_id = ctx.chat?.id as number;
  const message_id = (nextCtx.message?.message_id as number) - 1;
  let text;
  let keyboard;

  if (success) {
    keyboard = new InlineKeyboard().text("🏠 Bosh menyu", "home");
    text =
      "*Parolingiz muvaffaqqiyatli o'zgartirildi\\!*\n\n" +
      `Iltimos, uni hoziroq o'zingizga qulay joyga saqlab qo'ying: ||*${password}*||`;
  } else {
    text = "*Parolni o`zgartirib bo`lmadi, hisobingizga qayta kirib ko`ring.*";
    keyboard = new InlineKeyboard().text("🔑 Hisobga kirish", "home");
  }

  await ctx.api.editMessageText(chat_id, message_id, text, {
    reply_markup: keyboard,
    parse_mode: "MarkdownV2",
  });
}
