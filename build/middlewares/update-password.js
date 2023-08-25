"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
async function updatePassword(conversation, ctx) {
    var _a;
    const { message_id, chat: { id: chat_id }, } = await ctx.reply("*Yangi parolni kiriting*", {
        reply_markup: new grammy_1.InlineKeyboard().text("🔙 Bekor qilish", "home"),
        parse_mode: "Markdown",
    });
    // Parolni olamiz
    const nextCtx = await conversation.waitFor(":text");
    const password = (_a = nextCtx.message) === null || _a === void 0 ? void 0 : _a.text.trim();
    nextCtx.deleteMessage(); // Parolni o'chiramiz
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
    const { success } = await res.json();
    let text;
    let keyboard;
    if (success) {
        keyboard = new grammy_1.InlineKeyboard().text("🏠 Bosh menyu", "home");
        text =
            "*Parolingiz muvaffaqqiyatli o'zgartirildi\\!*\n\n" +
                `Iltimos, uni hoziroq o'zingizga qulay joyga saqlab qo'ying: ||*${password}*||`;
    }
    else {
        text = "*Parolni o`zgartirib bo`lmadi, hisobingizga qayta kirib ko`ring.*";
        keyboard = new grammy_1.InlineKeyboard().text("🔑 Hisobga kirish", "home");
    }
    ctx.api.editMessageText(chat_id, message_id, text, {
        reply_markup: keyboard,
        parse_mode: "MarkdownV2",
    });
}
exports.default = updatePassword;
