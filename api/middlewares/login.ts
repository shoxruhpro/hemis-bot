import { InlineKeyboard } from "grammy";
import MyContext from "../types/my-context";
import MyConversation from "../types/my-conversation";
import config from "../config";

export default async function login(
  conversation: MyConversation,
  ctx: MyContext
) {
  let login, password;

  await ctx.reply(
    "*Hemis axborot tizimidagi shaxsiy login raqamingizni yuboring*",
    {
      reply_markup: new InlineKeyboard().text("🔙 Bekor qilish", "home"),
      parse_mode: "Markdown",
    }
  );

  // Loginnni olamiz
  let nextCtx = await conversation.waitFor(":text");

  if (nextCtx.message?.text) login = parseInt(nextCtx.message?.text.trim());

  nextCtx.deleteMessage(); // Loginni o'chiramiz

  const chat_id = ctx.chat?.id as number;
  const message_id = (nextCtx.message?.message_id as number) - 1;

  await ctx.api.editMessageText(
    chat_id,
    message_id,
    "*Parolingizni yuboring*",
    { parse_mode: "Markdown" }
  );

  // Parolni olamiz
  nextCtx = await conversation.waitFor(":text");

  nextCtx.deleteMessage(); // Parolni o'chiramiz

  if (nextCtx.message?.text) password = nextCtx.message?.text.trim();

  // Tokenni olamiz
  const res = await fetch(config.target + "auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      login,
      password,
    }),
  });

  const { data, success } = await res.json();

  if (success) {
    nextCtx.session.token = data.token;

    ctx.api.editMessageText(
      chat_id,
      message_id,
      "*Avtorizatsiyadan muvaffaqqiyatli o'tdingiz*",
      {
        reply_markup: new InlineKeyboard().text("🏠 Bosh menyu", "home"),
        parse_mode: "Markdown",
      }
    );
  } else {
    ctx.api.editMessageText(chat_id, message_id, "*Login yoki parol xato!*", {
      reply_markup: new InlineKeyboard().text("🔑 Hisobga kirish", "login"),
      parse_mode: "Markdown",
    });
  }
}
